export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getErrorMessage = (error: any) => {
  if (typeof error === "string") {
    return error;
  } else if (typeof error === "object" && error !== null) {
    // Extrae mensajes de error de las propiedades del objeto
    return Object.values(error).join(", ");
  } else {
    return "An unknown error occurred.";
  }
};