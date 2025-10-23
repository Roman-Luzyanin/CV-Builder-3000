import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ExpandingSection from './ExpandingSection'; 
import '../styles/about.css'

export default function About({summary, setSummary, skills, setSkills,
								 visibility, setVisibility, languages, setLanguages}) {

	const [validation, setValidation] = useState({skill: true, lang: true});
	const textareaRef = useRef(null);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = textarea.scrollHeight + "px";
		}
	}, [summary]); 

	const toggleVisibility = () => setVisibility(v => !v);

	const resetFields = () => {
		setSummary('');
		setSkills([{id: crypto.randomUUID(), text: ""}]);
		setLanguages([{id: crypto.randomUUID(), text: ""}]);
		setVisibility(false);
		setValidation({skill: true, lang: true});
	}

	const addSkill = () => {
		const isFilled = skills.every(s => s.text.trim());

		if (!isFilled) {
			setValidation(prev => ({...prev, skill: false}));
			return
		}
		setSkills(prev => [...prev, {id: crypto.randomUUID(), text: ""}]);
		setValidation(prev => ({...prev, skill: true}));
	}
	
	const removeSkill = (id) => 
		setSkills(prev => prev.filter(skill => skill.id !== id));

	const handleSkill = (id, e) =>
		setSkills(prev =>
			prev.map(skill => 
				skill.id === id ? {...skill, text: e.target.value} : skill));

	const addLanguage = () => {
		const isFilled = languages.every(l => l.text.trim());

		if (!isFilled) {
			setValidation(prev => ({...prev, lang: false}));
			return
		}
		setLanguages(prev => [...prev, {id: crypto.randomUUID(), text: ""}]);
		setValidation(prev => ({...prev, lang: true}));
	}

	const removeLanguage = (id) => 
		setLanguages(prev => prev.filter(lang => lang.id !== id));
	
	const handleLanguage = (id, e) => 
		setLanguages(prev =>
			prev.map(lang => 
				lang.id === id ? {...lang, text: e.target.value} : lang));
	
	return (
		<div className="about">
			<div className="header">
				<h2>About</h2>
				{!visibility ?
					<button className='add' onClick={toggleVisibility}></button> :
					<button onClick={resetFields} className="remove"></button>
				}
			</div>
			
			<div className="body">
				<AnimatePresence mode='popLayout'>
					{!visibility ? (
						<p>You may add your summary</p>
					) : (
						<ExpandingSection key='about'>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4 }}
							>
								<div className="summary">
									<textarea
										ref={textareaRef}
										placeholder="Here goes your summary ..."
										value={summary}
										onChange={(e) => setSummary(e.target.value)}
									></textarea>
								</div>
								<div className="skillsWrapper">
									<div className="skillsBG">
										<div className="skillsSection">
											<p>Skills:</p>
											{skills.map((skill, idx, arr) => (
												<div key={skill.id} className="skill">
													<span>{idx + 1 + '.'}</span>
													<input
														placeholder='Your skill'
														value={skill.text}
														onChange={(e) => handleSkill(skill.id, e)}
														className={!validation.skill && 
																!skill.text.trim() ? 'invalid' : ''}
													/>
													{idx !== 0 && (
														<button 
															onClick={() => removeSkill(skill.id)}
															className="removeItem"
														></button>
													)}
													{idx === arr.length - 1 && (
														<button 
															onClick={addSkill}
															className="addItem"
														></button>											
													)}
												</div>
											))}
										</div>
										<div className="skillsSection">
											<p>Languages:</p>
											{languages.map((lang, idx, arr) => (
												<div key={lang.id} className="skill">
													<span>{idx + 1 + '.'}</span>
													<input 
														placeholder="Language"
														value={lang.text}
														onChange={(e) => handleLanguage(lang.id, e)}
														className={!validation.lang &&
																	!lang.text.trim() ? 'invalid' : ''}
													/>
													{idx !== 0 && (
															<button 
																onClick={() => removeLanguage(lang.id)}
																className="removeItem"
															></button>
														)}
														{idx === arr.length - 1 && (
															<button 
																onClick={addLanguage}
																className="addItem"
															></button>											
														)}
												</div>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						</ExpandingSection>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}