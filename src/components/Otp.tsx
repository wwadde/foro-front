import { useState } from "react";

interface OTPInputProps {
    length: number;
    onChange: (code: string[]) => void;
}

export default function OTPInput({ length, onChange }: OTPInputProps) {

    const [verificationCode, setVerificationCode] = useState(Array(length).fill(''));

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
            
            const newCode = [...verificationCode];
            newCode[index] = value;
            console.log(verificationCode);
            setVerificationCode(newCode);
            onChange(newCode);

            if (value && index < length - 1) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) {
                    (nextInput as HTMLInputElement).focus();
                }
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) {
                (prevInput as HTMLInputElement).focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text');
        if (/^\d*$/.test(pasteData) && pasteData.length === length) {
            const newCode = pasteData.split('').slice(0, length);
            onChange(newCode);
        }
    };

    return (
        <div className="mb-3 p-3 col-12 d-flex justify-content-center">
            {verificationCode.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    className="form-control mx-1 text-center"
                    id={`code-${index}`}
                    value={digit}
                    onChange={(e) => handleCodeChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    maxLength={1}
                    autoComplete="off"
                    style={{ width: '45px', fontSize: '1.5rem' }}
                    required
                />
            ))}
        </div>
    );
}