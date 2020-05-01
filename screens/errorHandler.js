const errorHandler = errorId => {
  switch (errorId) {
    case 'zlý email':
      return 'Zadali ste neplatný e-mail';
      break;
    case 'zlé heslo':
      return 'Zadali ste neplatné heslo';
      break;
    default:
      'Nastala neocakavana chyba';
  }
};

export default errorHandler;
