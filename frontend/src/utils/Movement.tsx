import { useEffect, useRef } from "react";


export function useKey(cb: Function) {

    const callbackRef = useRef(cb);


    useEffect(() => {

        callbackRef.current = cb;

    });

    useEffect(() => {
        function handle(event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowDown':
                    event.preventDefault();
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, y: state.y + 5 }));
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, y: state.y - 5 }));
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, x: state.x + 5 }));
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    callbackRef.current((state: { x: number, y: number }) => ({ ...state, x: state.x - 5 }));
                    break;
                // default:
                //     console.log(event.code);

            }
        }
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [cb])
}

export function useKey2(cb: Function, stageMap: Function) {

    const callbackRef = useRef(cb);

    useEffect(() => {
        callbackRef.current = cb;
    });

    useEffect(() => {
        const stage1Map = stageMap();
        function handle(event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowDown':
                    event.preventDefault();
                    console.log('moveToDown')
                    callbackRef.current((state: { x: number, y: number }) => {
                        // 범위를 벗어날 경우 혹은 장애물을 만날경우
                        if (state.x === 11 || stage1Map[state.x + 1][state.y] === 1) {
                            console.log('is obstacle or out of range')
                            return state
                        } else if (state.x === 11) { // 시작범위인 경우
                            console.log('is start')
                            return state
                        } else { // 이외의 경우에는 주욱 만날때까지 직진
                            let count = 0
                            // 장애물을 만나거나, 범위를 벗어나거나
                            while (state.x + count < 12 && stage1Map[state.x + count][state.y] !== 1) {
                                count++
                            }
                            console.log(`${count}번 가면 더 이상 가지 못합니다.`)
                            return { ...state, x: state.x + count - 1}
                        }                        
                    })
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    console.log('moveToUp')
                    callbackRef.current((state: { x: number, y: number }) => {
                        // 범위를 벗어날 경우 혹은 장애물을 만날경우
                        if (state.x === 0 || stage1Map[state.x - 1][state.y] === 1) {
                            console.log('is obstacle or out of range')
                            return state
                        } else { // 이외의 경우에는 주욱 만날때까지 직진
                            let count = 0
                            // 장애물을 만나거나, 범위를 벗어나거나
                            while (state.x - count > -1 && stage1Map[state.x - count][state.y] !== 1) {
                                count++
                            }
                            console.log(`${count}번 가면 더 이상 가지 못합니다.`)
                            return { ...state, x: state.x - count + 1}
                        }                        
                    })
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    console.log('moveToRight');
                    callbackRef.current((state: { x: number, y: number }) => {
                        // 범위를 벗어날 경우 혹은 장애물을 만날경우
                        if (state.y + 1 === 11 || stage1Map[state.x][state.y + 1] === 1) {
                            console.log('is obstacle or out of range')
                            return state
                        } else if (state.x === 11) { // 시작범위인 경우
                            console.log('is start')
                            return { ...state, y: state.y + 1 }
                        } else { // 이외의 경우에는 주욱 만날때까지 직진
                            let count = 0
                            // 장애물을 만나거나, 범위를 벗어나거나
                            while (state.y + count < 11 && stage1Map[state.x][state.y + count] !== 1) {
                                count++
                            }
                            console.log(`${count}번 가면 더 이상 가지 못합니다.`)
                            return { ...state, y: state.y + count - 1}
                        }                        
                    })
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    console.log('moveToLeft')
                    callbackRef.current((state: { x: number, y: number }) => {
                        // 범위를 벗어날 경우 혹은 장애물을 만날경우
                        if (state.y === 0 || stage1Map[state.x][state.y - 1] === 1) {
                            console.log('is obstacle or out of range')
                            return state
                        } else if (state.x === 11) { // 시작범위인 경우
                            console.log('is start')
                            return { ...state, y: state.y - 1 }
                        } else { // 이외의 경우에는 주욱 만날때까지 직진
                            let count = 0
                            // 장애물을 만나거나, 범위를 벗어나거나
                            while (state.y - count > -1 && stage1Map[state.x][state.y - count] !== 1) {
                                count++
                            }
                            console.log(`${count}번 가면 더 이상 가지 못합니다.`)
                            return { ...state, y: state.y - count + 1}
                        }                        
                    })
                    break;
                default:
                    console.log(event.code);

            }
        }
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [cb])
}

export const useKeyDown = (playerCanMove: boolean, charIsSelected: boolean, setFrameSet: Function, SetKeyPressCount: Function, setCharIsSelected: Function) => {
    useEffect(() => {
        function handle (event: KeyboardEvent) {
            if (playerCanMove && charIsSelected) {
                switch (event.code) {
                    case 'ArrowDown':
                        event.preventDefault();
                        setFrameSet((state: { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "moveDown"}))
                        SetKeyPressCount((state: number) => (state + 1))
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        setFrameSet((state: { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "moveUp"}))
                        SetKeyPressCount((state: number) => (state + 1))
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        setFrameSet((state: { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "moveRight"}))
                        SetKeyPressCount((state: number) => (state + 1))
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        setFrameSet((state: { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "moveLeft"}))
                        SetKeyPressCount((state: number) => (state + 1))
                        break;
                    case 'KeyR':
                        event.preventDefault();
                        setFrameSet((state: { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "response"}))
                        SetKeyPressCount((state: number) => 0)
                        break;
                    case 'KeyC':
                        setCharIsSelected(false);
                        break;
                    default:
                        console.log(event.code);
                }
            } else {
                // switch (event.code) {
                //     case 'ArrowLeft':
                //         console.log('character select left')
                //         event.preventDefault();
                //         // setFrameSet((state: { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "moveDown"}))
                //         // SetKeyPressCount((state: number) => (state + 1))
                //         break;
                //     default:
                //         console.log(event.code);
                // }
                event.preventDefault();
                // console.log('char선택이 아직되지 않았어요.')
            }
        }
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    },)
}

export const useKey3 = (selectedCharIdx: number, setSelectedCharIdx: Function, selectCharacter: Function) => {
    useEffect(() => {
        function handle (event: KeyboardEvent) {
            switch (event.code) {
                case 'ArrowLeft':
                    console.log('left', selectedCharIdx);
                    if (selectedCharIdx !== 1) {
                        const currentElem = document.getElementsByClassName(`char-${selectedCharIdx}`);
                        const nextElem = document.getElementsByClassName(`char-${selectedCharIdx-1}`);
                        currentElem[0].classList.remove(`activate${selectedCharIdx}`);
                        nextElem[0].classList.add(`activate${selectedCharIdx-1}`);
                        setSelectedCharIdx((state: number) => (state-1));
                    }
                    break;
                case 'ArrowRight':
                    console.log('right', selectedCharIdx);
                    if (selectedCharIdx !== 3) {
                        const currentElem = document.getElementsByClassName(`char-${selectedCharIdx}`);
                        const nextElem = document.getElementsByClassName(`char-${selectedCharIdx+1}`);
                        currentElem[0].classList.remove(`activate${selectedCharIdx}`);
                        nextElem[0].classList.add(`activate${selectedCharIdx+1}`);
                        setSelectedCharIdx((state: number) => (state+1));
                    }
                    break;
                case 'Enter':
                    console.log('select this character', selectedCharIdx);
                    selectCharacter(`char-${selectedCharIdx}`)
                    break;
                default:
                    console.log(event.code)
                    event.preventDefault();
            }
        }
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    })
}