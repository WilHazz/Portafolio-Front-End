const toggleTheme = document.getElementById('toggle-theme'); 
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('text-theme');

const toggleColors = document.getElementById('toggle-colors');
const rootStyles = document.documentElement.style;

/**Lenguajes */

const flagsElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");


const changeLanguage  = async (language) =>{
    try {
        const requestJson = await fetch(`./languages/${language}.json`);
        
        if(!requestJson.ok) throw new Error("Archivo no encontrado");
        const texts = await requestJson.json();
        
        for(const textToChange of textsToChange){
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;

            textToChange.innerHTML = texts[section][value];
       }

    } catch (err) {
        console.error("Error al cargar el idioma: ", err);
        alert("No se pudo cambiar el idioma. Verifica la ruta del archivo.");
    }
       
       
};

flagsElement.addEventListener("click", (e)=>{
    changeLanguage(e.target.parentElement.dataset.language); 
});

toggleTheme.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    if(toggleIcon.src.includes("moon.svg"))
    {
        toggleIcon.src= "assets/icons/sun.svg";
        toggleText.textContent = "Light Mode";

    }else
    {
        toggleIcon.src = "assets/icons/moon.svg";
        toggleText.textContent = "Dark Mode";
    }
});


toggleColors.addEventListener("click", (e) =>{
     rootStyles.setProperty("--primary-color", e.target.dataset.color);
});


