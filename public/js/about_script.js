

data_skills = [
    'Problem Solving',
    'Troubleshooting',
    'Communication',
    'Consulting',
    'TeamWork',
    'Team Management',
    'Time Management',
    'Organization',
    'Programming',
    'Graphic Design'
];

data_hardware = [
    'Laptops and Desktops',
    'Servers',
    'Network Router and Switches',
    'Data Network Infrastructure',
    'Security Camera Infrastructure',
    'Security Alarm Infrastructure',
    'Audio System Infrastructure'
];

data_programmingLanguage = [
    'HTML',
    'CSS',
    'JS',
    'React',
    'SASS',
    'Nodejs',
    'MySQL',
    'PHP',
    'Python',
    'Visual Basic',
    'C++',
    'C#',
    'Java'
];

data_software = [
    'Microsoft Windows OS',
    'Apple OS/IOS',
    'Linux OS',
    'Android OS',
    'git',
    'Blender',
    'GIMP Photo Editor',
    'Krita'
];

function category(data_array,list_id){
    data_array.forEach((data)=>{
        const page_element_id = document.getElementById(list_id);
        const element_label = document.createElement('div');

        element_label.classList.add('category-item-label');
		element_label.innerHTML = data;

        page_element_id.appendChild(element_label);
    });
}

category(data_skills,'section_1');
category(data_hardware,'section_2');
category(data_programmingLanguage,'section_3');
category(data_software,'section_4');