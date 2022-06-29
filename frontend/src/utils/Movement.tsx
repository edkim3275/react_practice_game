import { useEffect, useRef } from "react";


export function useKey(cb: Function) {

    const callbackRef = useRef(cb);


    useEffect(() => {

        callbackRef.current = cb;

    });

    useEffect(() => {
        function handle(event: KeyboardEvent) {
            event.preventDefault();
            switch (event.code) {
                case 'ArrowDown':
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, y: state.y + 5 }));
                    break;
                case 'ArrowUp':
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, y: state.y - 5 }));
                    break;
                case 'ArrowRight':
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, x: state.x + 5 }));
                    break;
                case 'ArrowLeft':
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, x: state.x - 5 }));
                    break;
                default:
                    console.log(event.code);

            }
        }
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [cb])
}
