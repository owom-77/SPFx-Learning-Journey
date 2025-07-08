import * as React from 'react';
import styles from '../styles/PasswordGenerator.module.scss';

const PasswordGenerator: React.FC = () => {
    const [num, setNum] = React.useState<boolean>(false);
    const [upper, setUpper] = React.useState<boolean>(false);
    const [lower, setLower] = React.useState<boolean>(false);
    const [spacial, setSpacial] = React.useState<boolean>(false);
    const [len, setLen] = React.useState<string>('8');
    const [password, setPass] = React.useState<string>();
    const copy = React.useRef<HTMLInputElement>(null);

    const handleCopy = ():void => {
        if (copy.current && password) {
            copy.current?.select();
            copy.current?.setSelectionRange(0, 900);
            navigator.clipboard.writeText(password)
                .then(() => {
                    console.log("Password copied to clipboard");
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        }
    };

    const spaChar = "!@#$%^&*()";
    const length = Number(len);

    const generator = (): void => {
        let str = "";
        let pass = "";

        if (num || upper || lower || spacial) {
            if (num) str += "123456789";
            if (upper) str += "ABCDEFGHIJKLMNOPQRTUVWXYZ";
            if (lower) str += "abcdefghijklmnopqrstuvwxyz";
            if (spacial) str += spaChar;

            for (let i = 0; i < length; i++) {
                pass += str.charAt(Math.floor(Math.random() * str.length));
            }
            setPass(pass);
        }
    };

    React.useEffect(() => {
        generator();
    }, [num, upper, lower, spacial, len]);

    return (
        <div className={styles.container}>
            <h1>Password Generator</h1>
            <div className={styles.output}>
                <input value={password} readOnly ref={copy} />
                <button onClick={handleCopy}>Copy</button>
            </div>
            <div className={styles.option}>
                <label>Uppercase</label>
                <input type="checkbox" onChange={() => setUpper(prev => !prev)} />
            </div>
            <div className={styles.option}>
                <label>Password Length: {len}</label>
                <input type="range" min="4" max="20" value={len} onChange={(e) => setLen(e.target.value)} />
            </div>
            <div className={styles.option}>
                <label>Lowercase</label>
                <input type="checkbox" onChange={() => setLower(prev => !prev)} />
            </div>
            <div className={styles.option}>
                <label>Numbers</label>
                <input type="checkbox" onChange={() => setNum(prev => !prev)} />
            </div>
            <div className={styles.option}>
                <label>Special Characters</label>
                <input type="checkbox" onChange={() => setSpacial(prev => !prev)} />
            </div>
        </div>
    );
};

export default PasswordGenerator;
