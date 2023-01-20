import React, { useState } from "react";
import axios from 'axios';

export default function Passwordcheck() {
    const [form, setForm] = useState('')
    const [ans, setAns] = useState();

    const strongPasswordChecker = () => {
        let passwd = form;
        let steps = 0;
        let mustAdd = 0;
    
        // Checks uppercaseletter
        if (!passwd.match(/[A-Z]/)) {
            mustAdd++;
        }
        // checks lowercasletter
        if (!passwd.match(/[a-z]/)) {
            mustAdd++;
        }
        // checks digits
        if (!passwd.match(/\d/)) {
            mustAdd++;
        }
        
        // form grops for repeating characters
        let groups = passwd.match(/(.)\1*/g).filter(x => x.length > 2);
    
        // passwd lessthan 20 characters 
        if (passwd.length <= 20) {
            groups.forEach(group => {
                steps += Math.trunc(group.length / 3);
                mustAdd -= Math.trunc(group.length / 3);
            })
        }
    
        if (passwd.length <= 20) {
            mustAdd = mustAdd > 0 ? mustAdd : 0;
            if (passwd.length + steps >= 6) {
                steps += mustAdd;
            } else {
                if (mustAdd > 6 - (passwd.length + steps)) {
                    steps += mustAdd;
                } else {
                    steps += 6 - (passwd.length + steps);
                }
            }
        }
    
        // password greater than 20 characters length
        if (passwd.length > 20) {
            let mustRemove = passwd.length - 20;
            let lengths = [];
            let plus = [];
            let chL = 0;
            for (let i = 1; i <= 3; i++) {
                for (let k = 0; k < groups.length; k++) {
                    if (plus[k] === undefined) { plus[k] = 0; }
                    chL = groups[k].length - plus[k];
                    if (lengths[k] === undefined) { lengths[k] = chL; }
                    const rec = () => {
                        if (Math.trunc((chL - i) / 3) < Math.trunc(chL / 3) && passwd.length - steps - i >= 6 && mustRemove >= i && chL > 2 && lengths[k] - i > 0) {
                            steps += i;
                            plus[k] += i;
                            mustRemove -= i;
                            chL -= i;
                            lengths[k] -= i;
                            rec();
                        }
                    }
                    rec();
                }
            }
            lengths.forEach(length => {
                if (length > 2) {
                    steps += Math.trunc(length / 3);
                    mustAdd -= Math.trunc(length / 3);
                }
            }
            )
    
            mustRemove = mustRemove > 0 ? mustRemove : 0;
            mustAdd = mustAdd > 0 ? mustAdd : 0;
            steps += mustAdd + mustRemove;
        }
    
        return steps;
    };

    const handleCheckstr = () => {
        let answer = strongPasswordChecker(form)

        axios.post(`http://localhost:8000/passwordcheck/`, {
            data: answer,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8'
            }
        }).then(resp => {
            setAns(answer);
        })
        // setAns(answer);
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
