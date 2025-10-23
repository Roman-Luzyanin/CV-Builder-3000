import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import ExpandingSection from './ExpandingSection'; 
import '../styles/education&experience.css'

export default function Experience({experience, setExperience}) {
	
	const [validation, setValidation] = useState({main: false, duty: false});
	const [warning, setWarning] = useState('');

	function isFilled(obj) {     //<<-----helper function
		return Object.values(obj).every(val => {
			if (Array.isArray(val)) return val.every(v => v.text.trim());
			if (typeof val === 'string') return val.trim();
		})
	}

	const addSection = () => {
		const current = experience[experience.length - 1];

		if (current && !isFilled(current)) {
			setValidation(prev => ({...prev, main: true, duty: true}));
			setWarning("Please fill out all fields before adding new section");
			setTimeout(() => setWarning(""), 4000);
			return
		}
		
		setExperience(prev => [
			...prev,
			{
				id: crypto.randomUUID(),
				company: "",
				position: "",
				duties: [{id: crypto.randomUUID(), text: ""}],
				startDate: "",
				endDate: ""
			}
		])

		setValidation(prev => ({...prev, main: false, duty: false}));
	}

	const removeSection = (id) => {
		setExperience(prev => prev.filter(item => item.id !== id));
		setWarning('');
	}

	const handleChange = (id, e) => {
		const { name, value } = e.target;
		setExperience(prev =>
			prev.map(item =>
				item.id === id ? {...item, [name]: value} : item
			)
		)
	}

	const addDuty = (id) => {
		const isFilled = experience.find(exp => exp.id === id).duties.every(d => d.text.trim());

		if (!isFilled) {
			setValidation(prev => ({...prev, duty: true}))
			return
		}

		setExperience(prev =>
			prev.map(item =>
				item.id === id ? 
				{...item, duties: [...item.duties, {id: crypto.randomUUID(), text: ""}]} :
				item
			)
		)

		setValidation(prev => ({...prev, duty: false}))
	}

	const removeDuty = (id, dutyID) => {
		setExperience(prev =>
			prev.map(item =>
				item.id === id ?
				{...item, duties: item.duties.filter(duty => duty.id !== dutyID)} :
				item
			)
		)
	}

	const handleDuty = (id, dutyID, e) => {
		setExperience(prev =>
			prev.map(item =>
				item.id === id ?
				{...item, duties: item.duties.map(duty =>
					duty.id === dutyID ? {...duty, text: e.target.value} : duty			
				)} : item
			)
		)
	}

	return (
		<div className="experience">
			<div className="header">
				<h2>Experience</h2>
				{experience.length === 0 && <button className='add' onClick={addSection}></button>}
			</div>

			<div className="body">
				<AnimatePresence mode='popLayout'>
					{experience.length === 0 ? (
						<p>You may add your work experience</p>
					) : (
						experience.map((item, idx) => (
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
											name='company'
											placeholder='Company'
											value={item.company}
											onChange={(e) => handleChange(item.id, e)}
											className={validation.main &&
													!item.company.trim() ? 'invalid' : ''}
										/>
										<input 
											name='position'
											placeholder='Position'
											value={item.position}
											onChange={(e) => handleChange(item.id, e)}
											className={validation.main &&
													!item.position.trim() ? 'invalid' : ''}
										/>
									</div>
									<div className="dutiesSection">
										<p>Job responsibilities:</p>
										<div  className="duties">
											{item.duties.map((duty, idx, arr) => (
												<div key = {duty.id} className="duty">
													<span>{idx + 1 + '.'}</span>
													<input
														placeholder='Your duty'
														value={duty.text}
														onChange={(e) => handleDuty(item.id, duty.id, e)}
														className={validation.duty &&
																  !duty.text.trim() ? 'invalid' : ''}
													/>
													{idx !== 0 && (
														<button 
															onClick={() => removeDuty(item.id, duty.id)}
															className='removeItem'
														></button>
													)}	
													{idx === arr.length - 1 && (
														<button 
															onClick={() => addDuty(item.id)}
															className='addItem'
														></button>
													)}
												</div>
											))}
										</div>
									</div>
									<div className="sectionBottom">
										<input 
											name='startDate'
											placeholder='Start Date'
											value={item.startDate}
											onChange={(e) => handleChange(item.id, e)}
											className={validation.main &&
													!item.startDate.trim() ? 'invalid' : ''}
										/>
										<span className='dash'></span>
										<input 
											name='endDate'
											placeholder='End Date'
											value={item.endDate}
											onChange={(e) => handleChange(item.id, e)}
											className={validation.main &&
													!item.endDate.trim() ? 'invalid' : ''}
										/>
									</div>
									<div className="buttons">
										{idx === experience.length - 1 && (
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

									{idx !== experience.length - 1 && <hr className='hr'/>}
								</motion.div>
								<AnimatePresence mode='popLayout'>
									{warning && idx === experience.length - 1 &&
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