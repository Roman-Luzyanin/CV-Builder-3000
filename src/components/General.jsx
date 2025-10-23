import { useRef } from "react";  
import '../styles/general.css'
import defaultImg from '../assets/profile.png'

export default function General({generalInfo, setGeneralInfo }) {
    
	const fileInputRef = useRef(null);

	const handleChange = (e) => 
		setGeneralInfo({...generalInfo, [e.target.name]: e.target.value});

	const addPhoto = (e) => 
		setGeneralInfo({...generalInfo, photo: URL.createObjectURL(e.target.files[0])});	

	 const handleChangePhoto = () => {
		if (generalInfo.photo) {
			setGeneralInfo({ ...generalInfo, photo: null });
			fileInputRef.current.value = "";
		} else {
			fileInputRef.current.click();
		}
	}

    return (
		<div className='general'>
			<h2>General Information</h2>
			<div className="genSection">
				<div className="genText">
					<input 
						name='name'
						placeholder='First Name & Last Name'
						value={generalInfo.name}
						onChange={(e) => handleChange(e)}	
					/>
					<input 
						name='spec'
						placeholder='Specialization'
						value={generalInfo.spec}
						onChange={(e) => handleChange(e)}	
					/>
					<input 
						name='email'
						placeholder='Email'
						value={generalInfo.email}
						onChange={(e) => handleChange(e)}
					/>
					<input 
						name='phone'
						placeholder='Phone Number'
						value={generalInfo.phone}
						onChange={(e) => handleChange(e)}
					/>
					<input 
						name='address'
						placeholder='Address'
						value={generalInfo.address}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div>
					<img 
						className="photo"
						src={generalInfo.photo ? generalInfo.photo : defaultImg}
						alt="Photo" 
					/>
					<input 
						type="file" 
						accept="image/*"
						onChange={addPhoto}
						ref={fileInputRef}
					/>	
					<button className="photoBtn" onClick={handleChangePhoto}> 
						{generalInfo.photo ? "Remove Photo" : "Upload Photo"}
					</button>
				</div>
			</div>
		</div>
    )
}


