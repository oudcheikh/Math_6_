import React, { useState } from 'react';
//import axios from 'axios';
//import CryptoJS from 'crypto-js';

function InscriptionPage() {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

         ///const encryptedCode = CryptoJS.AES.encrypt(code, 'secret key').toString();
         localStorage.setItem('code', code);

         // Stocker les informations de l'utilisateur en local
         //localStorage.setItem('userData', JSON.stringify(response.data));

         console.log('Code vérifié et utilisateur enregistré');
         

        // try {
        //     // Remplacez ceci par votre propre endpoint FastAPI pour vérifier le code
        //     const response = await axios.post('http://localhost:8000/verifier_code', { code });

        //     // Encrypter et stocker le code en local
        //     ///const encryptedCode = CryptoJS.AES.encrypt(code, 'secret key').toString();
        //     localStorage.setItem('code', code);

        //     // Stocker les informations de l'utilisateur en local
        //     localStorage.setItem('userData', JSON.stringify(response.data));

        //     console.log('Code vérifié et utilisateur enregistré');
        // } catch (error) {
        //     if (error.response) {
        //         setErrorMessage(error.response.data.detail);
        //     } else {
        //         setErrorMessage('Erreur lors de la vérification du code');
        //     }
        // }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Code:</label>
                    <input 
                        type="text" 
                        value={code} 
                        onChange={(e) => setCode(e.target.value)} 
                    />
                </div>
                <button type="submit">Soumettre</button>
            </form>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        </div>
    );
}

export default InscriptionPage;
