'use client';

import React from 'react';

interface propType {
	characters: number;
	setOtp: (otp: string) => void;
	wrapperClassName?: string;
	inputClassName?: string;
	doAutoFocus?: boolean;
}

const wrapperStyle: React.CSSProperties = {
	display: 'flex',
	gap: '1rem',
}
const inputStyle: React.CSSProperties = {
	height: '2rem',
	width: '2rem',
	textAlign: 'center',
	boxShadow: '0 0 1px 1px #dedede',
	fontSize: '1.5rem',
}

const Otp: React.FC<propType> = (props) => {
	const { characters, setOtp, wrapperClassName = '', inputClassName = '', doAutoFocus = false } = props;
	const [optLocal, setOtpLocal] = React.useState<string[]>(Array(characters).fill(''));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value;

		/** store only last typed character */
		const char = value.slice(-1);

		setOtpLocal((prev: string[]) => {
			const updated = [...prev];
			updated[index] = char;  /** replace at correct index */
			return updated;
		});

		if (char && index < characters - 1) {
			const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement | null;
			next?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === "Backspace") {
			e.preventDefault();

			setOtpLocal(prev => {
				const updated = [...prev];
				updated[index] = ""; /** Clear current box */
				return updated;
			});

			// Move focus to previous box if exists
			if (index > 0) {
				const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement | null;
				prevInput?.focus();
			}
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasted = e.clipboardData.getData("text").trim();
		const chars = pasted.slice(0, characters).split("");
		setOtpLocal(chars);

		const last = document.getElementById(`otp-${chars.length - 1}`) as HTMLInputElement | null;
		last?.focus();
	}

	const showInputFields = () => {
		return (
			<>
				{[...Array(characters)].map((_, index: number) => (
					<input
						type="text"
						key={index}
						id={`otp-${index}`}
						className={`${inputClassName}`}
						value={optLocal[index]}
						onChange={e => handleChange(e, index)}
						onKeyDown={e => handleKeyDown(e, index)}
						onPaste={e => handlePaste(e)}
						maxLength={1}
						style={inputStyle}
					/>
				))}
			</>
		);
	};

	React.useEffect(() => {
		setOtp(optLocal.join(''));
	}, [optLocal]);

	React.useEffect(() => {
		if (doAutoFocus) {
			const first = document.getElementById("otp-0") as HTMLInputElement | null;
			first?.focus();
		} 
	}, []);

	return (
		<div
			className={`${wrapperClassName}`}
			style={wrapperStyle}
		>
			{showInputFields()}
		</div>
	);
}

export default React.memo(Otp);
