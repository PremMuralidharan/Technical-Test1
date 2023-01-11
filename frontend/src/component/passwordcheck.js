import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Passwordcheck() {
    const [form, setForm] = useState('')
    const [ans, setAns] = useState();

    function containsUppercase(str) {
        return /^[A-Z]+$/.test(str);
    }

    function containsLowercase(str) {
        return /^[a-z]+$/.test(str);
    }
    function repeats(str) {
        return /(.)\1{2,}/.test(str)
    }
    function digits(str) {
        return /\d/.test(str)
    }


    function checkStongPassword(str) {
        let ans = 0;
        if (str.length < 6) {
            ans = 6 - str.length
        } else if(str.length >= 6){
            if (repeats(str))
                ans -= 1
            if (containsLowercase(str))
                ans += 1
            if (!digits(str))
                ans += 1
            if(containsUppercase(str))
                ans += 1              
        }
        return ans;
    }
    const handleCheckstr = async() => {
        let answer = checkStongPassword(form)

        await axios.post(`http://localhost:8000/passwordcheck/`, {
            data: answer,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8'
            }
        }).then(resp => {
            setAns(answer);
            console.log("gud job");
        })
        setAns(answer);
    }

    const onChange = data => {
        const value = data.value;
        setForm(value);
    };

    return (
            <div>
                <div>
                    <p>Input string</p>
                    <input type="text"
                        onChange={(event) => onChange({ value: event.target.value })}
                        value={form} />
                </div><br></br>
                <div>
                    Answer : {ans}
                </div><br></br>
                <button type="submit" className="site-btn"
                    onClick={() => handleCheckstr()}>submit
                </button>
            </div>

    );
}
