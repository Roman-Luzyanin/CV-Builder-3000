import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import ExpandingSection from './ExpandingSection'; 
import '../styles/education&experience.css'

export default function Education({education, setEducation}) {
	
	const [validation, setValidation] = useState(false);
	const [warning, setWarning] = useState('');

	const addSection = () => {
		const current = education[education.length - 1];
		const isFilled = (obj) => Object.values(obj).every(val => val.trim());

		if (current && !isFilled(current)) {
			setValidation(true);
			setWarning("Please fill out all fields before adding new section");
			setTimeout(() => setWarning(""), 4000);
			return
		}

		setEducation(prev => [
			...prev,
			{
				id: crypto.randomUUID(),
				school: "",
				degree: "",
				startDate: "",
				endDate: ""
			}
		])

		setValidation(false);
	}

	const removeSection = (id) => {
		setEducation(prev => prev.filter(item => item.id !== id));
		setWarning('');
	}

	const handleChange = (id, e) => {
		const { name, value } = e.target;
		setEducation(prev =>
			prev.map(item => 
				item.id === id ? {...item, [name]: value} : item
			)
		)
	}

	return (
		<div className="education">
			<div className="header">
				<h2>Education</h2>
				{education.length === 0 && <button className='add' onClick={addSection}></button>}
			</div>
			
			<div className="body">
				<AnimatePresence mode='popLayout'>
					{education.length === 0 ? (
						<p>You may add your education</p>
					) : (
						education.map((item, idx) => (
							<ExpandingSection key={item.id}>
								<motion.div 
									className="newSection"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.4 }}
								>
									<div className="sectionTop">
										<input 
											name='school'
											placeholder='School'
											value={item.school}
											onChange={(e) => handleChange(item.id, e)}
											className={validation && !item.school.trim() ? 'invalid' : ''}
										/>
										<input 
											name='degree'
											placeholder='Degree'
											value={item.degree}
											onChange={(e) => handleChange(item.id, e)}
											className={validation && !item.degree.trim() ? 'invalid' : ''}
										/>
									</div>
									<div className="sectionBottom">
										<input 
											name='startDate'
											placeholder='Start Date'
											value={item.startDate}
											onChange={(e) => handleChange(item.id, e)}
											className={validation && !item.startDate.trim() ? 'invalid' : ''}
										/>
										<span className='dash'></span>
										<input 
											name='endDate'
											placeholder='End Date'
											value={item.endDate}
											onChange={(e) => handleChange(item.id, e)}
											className={validation && !item.endDate.trim() ? 'invalid' : ''}
										/>
									</div>
									<div className="buttons">
										{idx === education.length - 1 && (
											<button 
												className='add' 
												onClick={addSection}
											></button>
										)}
										<button 
											className='remove' 
											onClick={() => removeSection(item.id)}
										></button>
									</div>

									{idx !== education.length - 1 && <hr className='hr'/>}
								</motion.div>
								<AnimatePresence mode='popLayout'>
									{warning && 
										<motion.div 
											className="warning"
											initial={{ opacity: 0, y: -20 }}
											animate={{ opacity: 1, y:  0 }}
											exit={{ opacity: 0, y:  -20 }}
											transition={{ duration: 0.4 }}
										>{warning}
									</motion.div>}
								</AnimatePresence>
							</ExpandingSection>
						))
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}