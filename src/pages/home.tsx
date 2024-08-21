import bg from '../assets/c3123331-f06a-4ca6-9965-1847471cccfb.jpeg';
import './home.css';

import flor from '../assets/Convite_de_casamento_virtual_e_interativo_com_folhagens__6_-removebg-preview.png';

import act1 from '../assets/actions/Convite_de_casamento_virtual_e_interativo_com_folhagens__1_-removebg-preview.png';
import act2 from '../assets/actions/Convite_de_casamento_virtual_e_interativo_com_folhagens__2_-removebg-preview.png';
import act3 from '../assets/actions/Convite_de_casamento_virtual_e_interativo_com_folhagens__3_-removebg-preview.png';

import { Modal, Spin } from 'antd';

import coracao from '../assets/Convite_de_casamento_virtual_e_interativo_com_folhagens__5_-removebg-preview.png';
import { useState } from 'react';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleFormSubmit = (event:any) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);

        fetch('https://api.sheetmonkey.io/form/tNmjfXPGjnC51qHobT7f9Q', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                alert('Confirmado com sucesso!');
            } else {
                alert('Falha ao enviar o formulário.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar o formulário:', error);
            alert('Ocorreu um erro ao enviar o formulário.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpen2(false);
    };

    const redirectToGoogleMaps = () => {
        window.location.href = 'https://maps.app.goo.gl/3yq7tzgHpxUGZjbH6';
    };

    return (
        <>
            <img className='bg' src={bg} alt="Imagem de fundo" />
            <div className="gradient">
                <div className="cube">
                    <div className='content'>
                        <h1 className='title'>MELISSA E GUSTAVO</h1>
                        <img className='corac' src={coracao} alt="" />
                        <p className='desc'>Convidam para a cerimônia do seu casamento a ser realizada em</p>
                        <div className="center">
                            <div className="flex date">
                                <div>
                                    <img className='flor' src={flor} alt="" />
                                </div>
                                <div><p className='date'>25.01.2025</p></div>
                                <div>
                                    <img className='flor' src={flor} alt="" />
                                </div>
                            </div>
                        </div>
                        <p>às 18:00</p>
                        <div className="center">
                            <div className="flex actions">
                                <div className="col" onClick={redirectToGoogleMaps}>
                                    <img src={act1} alt="" />
                                    <p>Cerimônia e recepção</p>
                                </div>

                                <div className="col">
                                    <img src={act2} alt="" onClick={showModal} />
                                    <p>Confirmação de presença</p>
                                </div>

                                <div className="col" onClick={showModal2}>
                                    <img src={act3} alt="" />
                                    <p>Lista de presentes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal 
                title="Confirmação de presença" 
                open={isModalOpen} 
                onCancel={handleCancel} 
                footer={[]}
            >
                {loading ? (
                    <Spin tip="Enviando..." />
                ) : (
                    <form onSubmit={handleFormSubmit} method="POST">
                        <label>Nome:</label><br />
                        <input style={{width:'100%'}} type="text" name="Nome" required />
                        <button style={{marginTop: '10px', width: '100%'}} type="submit" value="Confirmar">Confirmar</button>
                    </form>
                )}
            </Modal>

            <Modal 
                title="Lista de presentes" 
                open={isModalOpen2} 
                onCancel={handleCancel} 
                footer={[]}
            >   
                Contribua com a Melissa e o Gustavo em seus planos futuros. Segue abaixo a chave Pix: <br />
                <p className='key'>51984437868</p>
                <p>Gustavo Henrique Michaelsen - Itaú</p>
            </Modal>
        </>
    );
}

export default Home;
