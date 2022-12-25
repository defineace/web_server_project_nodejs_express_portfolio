data_skills = [
    ['Problem Solving',10],
    ['Troubleshooting',10],
    ['Communication',8],
    ['Consulting',7],
    ['TeamWork',9],
    ['Team Management',7],
    ['Time Management',9],
    ['Organization',9],
    ['Programming',7],
    ['Graphic Design',7]
];

data_hardware = [
    ['Install PC/Server Devices',10],
    ['Install PC/Server Components',10],
    ['Troubleshoot PC/Server Components',7],
    ['Install Network Devices',10],
    ['Install Network Components',10],
    ['Troubleshoot Network Components',8],
    ['Data Infrastructure',10],
    ['Voice Infrastructure',10],
    ['Security Camera Infrastructure',9],
    ['Security Alarm Infrastructure',7],
    ['Audio System Infrastructure',8]

];

data_programmingLanguage = [
    ['HTML',8],
    ['CSS',7],
    ['JS',7],
    ['MySQL',6],
    ['PHP',5],
    ['Node JS',5],
    ['Python',7],
    ['Visual Basic',7],
    ['C++',5],
    ['C#',5],
    ['Java',4]
];

data_software = [
    ['Microsoft Windows OS',9],
    ['Apple OS/IOS',9],
    ['Ubuntu Linux OS',8],
    ['Android OS',8],
    ['Word, Excel, Powerpoint',9],
    ['Blender',8],
    ['GIMP Photo Editor',7],
    ['Krita',7],
    ['OBS Studio',8],
    ['Davinci Resolve',4],
    ['FL Studio',7],
	['Unity',4]
];

function category(data_array,list_id){
    data_array.forEach((data,i)=>{
        const page_element_id = document.getElementById(list_id);


        const element_cataegory_item = document.createElement('div');
        const element_label = document.createElement('div');
        const element_statBar_container = document.createElement('div');
        const element_statBar = document.createElement('div');

        element_label.classList.add('category-label');
        element_statBar_container.classList.add('category-statBar-container');
        element_statBar.classList.add('category-statBar');

		element_label.innerHTML = data[0];
		element_statBar.innerHTML = '&#8205;';   
        element_statBar.style.width = data[1]/10*100+'%';

        element_statBar_container.appendChild(element_statBar);

        element_cataegory_item.appendChild(element_label);
        /*
        element_cataegory_item.appendChild(element_statBar_container);
        */
        page_element_id.appendChild(element_cataegory_item);
    });
}

category(data_skills,'section_1');
category(data_hardware,'section_2');
category(data_programmingLanguage,'section_3');
category(data_software,'section_4');