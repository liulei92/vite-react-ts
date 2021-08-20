import React from 'react';
import { useParams } from 'react-router-dom';

const NoFond: React.FC = () => {
  const params = useParams<{ id?: string }>();

  return (
    <div>
      <h2>{params.id || 'error'}</h2>
    </div>
  );
};
export default NoFond;
