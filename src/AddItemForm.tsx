import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={error ? true : false}
                   id="standard-basic"
                   label={!error? "Введите текст": "Требуется название!"}
                   variant="standard"
                   size="small"/>
        {/*        <button onClick={addItem}>+</button>*/}
        <Button variant="contained" onClick={addItem}
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}>+</Button>
        {error && <div className="error-message">{error}</div>}
    </div>
}
