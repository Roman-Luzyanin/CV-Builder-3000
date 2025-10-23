import { useState } from 'react'
import '../styles/cv.css'
import General from './General.jsx'
import About from './About.jsx'
import Education from './Education.jsx'
import Experience from './Experience.jsx'
import Preview from './Preview.jsx'

function CV() {
    const [editMode, setEditMode] = useState(true);
	const [generalInfo, setGeneralInfo] = useState(
		{name: '', spec: '', email: '', phone: '', address: '', photo: null }
	);
	const [visibility, setVisibility] = useState(false);
	const [summary, setSummary] = useState('');
	const [skills, setSkills] = useState([{id: crypto.randomUUID(), text: ""}]);
	const [languages, setLanguages] = useState([{id: crypto.randomUUID(), text: ""}]);
	const [education, setEducation] = useState([]);
	const [experience, setExperience] = useState([]);
	const [color, setColor] = useState('#99C1F1');

	const handleMode = () => setEditMode(!editMode);

	const handleColorTheme = (e) => setColor(e.target.value);
	document.documentElement.style.setProperty("--bg-color", color);

  	return (
		<>
			<header className="cvHeader">
				<h1>CV Builder 3000</h1>
				<div className="controls">
					<button onClick={handleMode}
							className={editMode ? "edit" : "save" }>
					</button>
				
					{!editMode && (
						<div className="saveModeBtns">
							<div className="colorWrapper">
								<div className='colorPicker'></div>
								<input type="color" onChange={handleColorTheme} value={color}/>
							</div>	
							<button
								className='print'
								onClick={() => window.print()}
							></button>
						</div>
					)}
				</div>
			</header>
			
			{editMode ? (
				<div className="cv">
					<General 
						generalInfo = {generalInfo}
						setGeneralInfo = {setGeneralInfo}
					/> 
					<About
						summary = {summary}
						setSummary = {setSummary}
						skills = {skills}
						setSkills = {setSkills}
						languages = {languages}
						setLanguages = {setLanguages}
						visibility={visibility}
						setVisibility={setVisibility}
					/>
					<Education 
						education = {education}
						setEducation = {setEducation}
					/>
					<Experience 
						experience = {experience}
						setExperience = {setExperience}
					/>
				</div>
			) : (
				<Preview 
					generalInfo = {generalInfo}
					summary = {summary}
					skills = {skills}
					setSkills = {setSkills}
					languages = {languages}
					setLanguages = {setLanguages}
					education = {education}
					experience = {experience}
					setExperience = {setExperience}
				/>
			)}
		</> 
  	)
}

export default CV
