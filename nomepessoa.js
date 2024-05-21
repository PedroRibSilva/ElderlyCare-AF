import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';

const NomePessoa = ({ pessoaId }) => {
  const [nome, setNome] = useState('');

  useEffect(() => {
    const fetchNome = async () => {
      try {
        const doc = await db.collection('pessoas').doc(pessoaId).get();
        if (doc.exists) {
          setNome(doc.data().nome);
        } else {
          console.log('Nenhum documento encontrado!');
        }
      } catch (error) {
        console.error('Erro ao buscar nome:', error);
      }
    };

    fetchNome();
  }, [pessoaId]);

  return (
    <div>
      <h1>Nome da Pessoa: {nome}</h1>
    </div>
  );
};

export default NomePessoa;