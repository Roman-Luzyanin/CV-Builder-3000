import { useEffect } from 'react'
import '../styles/preview.css'
import defaultImg from '../assets/profile.png'

export default function Preview({generalInfo, summary, skills, languages, education, experience,
									setSkills, setLanguages, setExperience}) {
	useEffect(() => {
		skills.length > 1 && setSkills(prev => prev.filter(skill => skill.text !== ''));
		languages.length > 1 && setLanguages(prev => prev.filter(lang => lang.text !== ''));
		experience.length > 0 && setExperience(prev => prev.map(item => item && 
			{...item, duties: item.duties.length > 1 ?
					 item.duties.filter(duty => duty.text !== ''): item.duties}))
	}, [])

	return (
		<div className="wrapper">
			<div className="preview">
				<header className="previewHeader">
					<img 
						className='previewPhoto'
						src={generalInfo.photo ? generalInfo.photo : defaultImg}
						alt="previewPhoto" 
					/>
					<div className="cutout"></div>
					<div className="previewInfo">
						<div>
							<h1>{generalInfo.name}</h1>
							<p>{generalInfo.spec}</p>
						</div>
					</div>
				</header>

				<main className='previewBody'>
					<aside className="previewAside">
						<div className="previewSection">
							<div className="contact">
								<span className='phoneImg'></span>
								<p>{generalInfo.phone}</p>
							</div>
							<div className="contact">
								<span className='emailImg'></span>
								<p>{generalInfo.email}</p>
							</div>
							<div className="contact">
								<span className='addressImg'></span>
								<p>{generalInfo.address}</p>
							</div>
						</div>

						<div className="previewSection">
							<h2>Education</h2>
							<hr />
							{education.length === 0 ? (
								<p>No information specified</p>
							) : (
								education.map((edu, i) => (
									<div key={i} className='education'>
										<p className='degree'>{edu.degree}</p>
										<strong><p>{edu.school}</p></strong>
										<p>{edu.startDate} {(edu.startDate || edu.endDate) && '-'} {edu.endDate}</p>
									</div>
								))
							)}
						</div>

						<div className="previewSection skills">
							<h2>Skills</h2>
							<hr />
							{skills[0].text === '' ? (
								<p>No information specified</p>
							) : (
								<ul>
									{skills.map((skill, i) => (
										<li key={i}>
											{skill.text}
										</li>
									))}
								</ul>
							)}
						</div>

						<div className="previewSection languages">
							<h2>Languages</h2>
							<hr />
							{languages[0].text === '' ? (
								<p>No information specified</p>
							) : (	
								languages.map((lang, i) => (
									<p key={i}>{lang.text}</p>
								))
							)}
						</div>
					</aside>
						
					<section className="previewMain">
						<summary className="previewSection">
							<h2>About Me</h2>
							<hr />
							{summary ? summary : 'No information specified' }
						</summary>
						<div className="previewSection">
							<h2>Work Experience</h2>
							<hr />
							{experience.length === 0 ? (
								<p>No information specified</p>
							) : (
								experience.map((exp, i) => (
									<div key={i} className='experience'>
										<p>{exp.startDate} {(exp.startDate || exp.endDate) && '-'} {exp.endDate}</p>
										<strong><p>{exp.company}</p></strong>
										<p className='position'>{exp.position}</p>
										<ul>
											{exp.duties.map((duty, i) => (
												duty.text !== '' &&
												<li key={i}>
													{duty.text}
												</li>
											))}
										</ul>
									</div>
								))
							)}
						</div>
					</section>
				</main>
			</div>	
		</div>
	)
}

