module.exports = function (dataHora) { 
    try {
        const dateTimeString = dataHora;
        const dateTime = new Date(dateTimeString);

        if (isNaN(dateTime.getTime())) {
            throw new Error("Data informada não está no formato válido.");
        }

        const dateParts = dateTime.toISOString().split('T')[0].split('-');
        const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0].substring(2)}`;

        // Convertendo para o fuso horário de Brasília (GMT-3)
        const brasiliaTime = new Date(dateTime.getTime() - (3 * 60 * 60 * 1000));

        // Obtendo a hora formatada
        const time = brasiliaTime.toISOString().split('T')[1].split('.')[0].slice(0, -3);

        return [date, time];
    } catch (error) {
        console.error("Erro ao processar data e hora:", error.message);
        return [null, null]; // Retorna valores nulos em caso de erro
    }
};







// module.exports = function (dataHora) { 

// const dateTimeString = dataHora;
// const dateTime = new Date(dateTimeString);
// const dateParts = dateTime.toISOString().split('T')[0].split('-');
// const date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0].substring(2)}`;

// // Convertendo para o fuso horário de Brasília (GMT-3)
// const brasiliaTime = new Date(dateTime.getTime() - (3 * 60 * 60 * 1000));
// // Obtendo a hora formatada
// const time = brasiliaTime.toISOString().split('T')[1].split('.')[0].slice(0, -3);

//     return [date,time]
// };