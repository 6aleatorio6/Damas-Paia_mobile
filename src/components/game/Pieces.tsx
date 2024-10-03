import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { Piece } from './Piece';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { createPiecesProps, getPieceById } from '@/libs/game/helpers';
import { useSoundsFromGame } from '@/libs/game/useSoundsFromGame';

interface PiecesProps {
  squareSize: number;
}
export default function Pieces({ squareSize }: PiecesProps) {
  const playSounds = useSoundsFromGame();
  const socket = useMatchSocket();
  const { myPlayer, opPlayer, piecesInit } = socket.data;
  const [opPieces, setOpPieces] = useState(() => createPiecesProps(piecesInit, opPlayer, squareSize));
  const [myPieces, setMyPieces] = useState(() => createPiecesProps(piecesInit, myPlayer, squareSize));

  useEffect(() => {
    socket.on('match:update', async ({ chainOfMotion, isQueen, piecesDeads, pieceId }) => {
      const pieceMov = getPieceById(pieceId, myPieces, opPieces);
      const anima = [] as Animated.CompositeAnimation[];

      // toca o som de movimento ou captura
      if (piecesDeads.length) await playSounds('capture');

      // monto o array ao contrario para o caso de uma dama capturar uma peça a distancia.
      // quando isso acontece a captura/captura_em_cadeia sempre nos movimentos finais, e no começo tem as casas vazias que a dama se movimentou.
      for (let i = chainOfMotion.length - 1; i >= 0; i--) {
        // verifico e adiciono as animações em ordem descrecente
        const deadId = piecesDeads[piecesDeads.length - (chainOfMotion.length - i)];
        if (deadId) {
          const pieceDead = getPieceById(deadId, myPieces, opPieces);
          anima.push(
            Animated.timing(pieceDead.morrerPiece, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          );
        }

        // adiciono as animações em ordem descrecente
        const mov = chainOfMotion[i];
        anima.push(
          Animated.timing(pieceMov.movePiece, {
            toValue: { x: mov.x * squareSize, y: mov.y * squareSize },
            duration: Math.max(130 - chainOfMotion.length * 3, 30),
            delay: 30,
            useNativeDriver: true,
          }),
        );
      }

      // reverto para ordem crescente
      anima.reverse();

      if (isQueen !== pieceMov.isQueen) {
        pieceMov.isQueen = isQueen;
        anima.push(
          Animated.timing(pieceMov.fadeQueen, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        );
      }

      Animated.sequence(anima).start(() => {
        const setPieces = opPieces.find((piece) => piece.id === pieceId) ? setMyPieces : setOpPieces;

        setPieces((pieces) => pieces.filter((piece) => !piecesDeads.includes(piece.id)));
      });
    });

    return () => socket.off('match:update') as any;
  }, []);

  const pathState = useState<[number, Coord[]] | null>();

  return (
    <>
      {opPieces.map((piece) => (
        <Piece key={piece.id} {...piece} />
      ))}
      {myPieces.map((piece) => (
        <Piece key={piece.id} {...piece} isMyPiece pathState={pathState} />
      ))}
    </>
  );
}
