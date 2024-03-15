const getRows = async (pdf) => {
    let urlPdf = 'https://script.google.com/macros/s/AKfycbxkWRzwEzg7Sh-V3UGSJVslI9s1sF6WTrADnLn8h9W7vTY2UhbQ9VsMoQjljj-oIWzg/exec'
    try {
        const response = await fetch(`${urlPdf}?pdfName=${pdf}`);
        
        const data = await response.json();
        
        data.map(obj => {
            
            // Create li element
            const li = document.createElement('li');
            li.classList.add('list-group-item');
        
            // Set inner HTML of the li element with name and comment
            li.innerHTML = `
                <strong>${obj.Name}:</strong> ${obj.Comment}
            `;
        
            // Append the li element to the ul parent
            commentsList.appendChild(li);
        });
        
        return data;
    } catch (error) {
        const li = document.createElement('li');
            li.classList.add('list-group-item');
        
            // Set inner HTML of the li element with name and comment
            li.innerHTML  = "Error al capturar comentarios, Intente de nuevo o contacte al administrador.";
        
            // Append the li element to the ul parent
            document.getElementById('commentsList').appendChild(li);
        
    }
}



export default getRows; // Export the function