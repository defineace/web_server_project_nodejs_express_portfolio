/*
    DESCRIPTION: This code handles API call fetch Prompt data from server
*/

function elements_create_promptsScrollbar(data) {
    for( var i=0; i<Object.keys( data ).length; i++){
        var element_container_promptScroll_button = document.createElement('div');
        var element_promptsScrollbar_button = document.createElement('button');

        element_container_promptScroll_button.className = 'container_prompt_scroll_button';
        element_promptsScrollbar_button.className = 'prompt_scroll_button';
        const value = Object.keys( data )[i];

        element_promptsScrollbar_button.addEventListener('click', (e) => {
            document.getElementById('prompts').innerHTML = '';
            elements_create_prompts(data[value]);
        });

        element_promptsScrollbar_button.textContent = Object.keys( data )[i];

        element_container_promptScroll_button.appendChild(element_promptsScrollbar_button);
        document.getElementById("prompt_list").appendChild(element_container_promptScroll_button);
    }
}

function elements_create_prompts(data) {
    for( index=0 ; index<data.length ; index++){
        // ###################################################################################################
        // Create Container Elements
        var element_container_prompt = document.createElement('div');
        var element_container_tags = document.createElement('div');
        var element_container_tag_flags = document.createElement('div');
        var element_container_tag_parameters = document.createElement('div');

        var element_prompt_body = document.createElement('div');
        
        // ###################################################################################################
        // Create Elements
        var element_prompt_header = document.createElement('h1');
        var element_prompt_header_parameters = document.createElement('h1');
        var element_prompt_header_flags = document.createElement('h1');

        var element_prompt_info_label_syntax = document.createElement('h3');
        var element_prompt_info_label_description = document.createElement('h3');
        var element_prompt_info_label_example = document.createElement('h3');

        var element_prompt_info_syntax = document.createElement('p');
        var element_prompt_info_description = document.createElement('p');
        var element_prompt_info_example = document.createElement('code');

        // ###################################################################################################
        // Add data to elements
        element_prompt_header.innerHTML = "Prompt";
        element_prompt_header_parameters.innerHTML = "Parameters";
        element_prompt_header_flags.innerHTML = "Flags";

        element_prompt_info_label_syntax.innerHTML = "Syntax";
        element_prompt_info_label_description.innerHTML = "Description";
        element_prompt_info_label_example.innerHTML = "Example";

        element_prompt_info_syntax.innerHTML = data[index].prompt;
        element_prompt_info_description.innerHTML = data[index].prompt_description;
        element_prompt_info_example.innerHTML = "C:>" + data[index].prompt_example;

        // ###################################################################################################
        // Add tags to element
        element_container_prompt.className = 'prompt';
        element_prompt_header.className = 'prompt-header';
        element_prompt_body.className = 'prompt-body';

        element_container_tags.className = 'container-tags';
        element_container_tag_flags.className = 'container-tag-flags';
        element_container_tag_parameters.className = 'container-tag-parameters';

        element_prompt_info_example.className = 'terminal';

        // ###################################################################################################
        // Add element subtag

        try{
            for( i=0; i<data[index].prompt_flags.length; i++)
            {
                var element_flag_container = document.createElement('div');
                var element_flag_label_syntax = document.createElement('h3');
                var element_flag_label_description = document.createElement('h3');
                var element_flag_label_example = document.createElement('h3');
                var element_flag_syntax = document.createElement('p');
                var element_flag_description = document.createElement('p');
                var element_flag_example = document.createElement('code');
                element_flag_label_syntax.innerHTML = "Flag";
                element_flag_label_description.innerHTML = "Description";
                element_flag_label_example.innerHTML = "Example";
                element_flag_syntax.innerHTML = data[index].prompt_flags[i].flag;
                element_flag_description.innerHTML = data[index].prompt_flags[i].flag_description;
                element_flag_example.innerHTML = "C:>" + data[index].prompt_flags[i].flag_example;
                element_flag_container.className = "tag-flag-info";
                element_flag_example.className = 'terminal';
                element_flag_container.appendChild(element_flag_label_syntax);
                element_flag_container.appendChild(element_flag_syntax);
                element_flag_container.appendChild(element_flag_label_description);
                element_flag_container.appendChild(element_flag_description);
                element_flag_container.appendChild(element_flag_label_example);
                element_flag_container.appendChild(element_flag_example);
                element_container_tag_flags.appendChild(element_flag_container);
            }
            
            for( i=0; i<data[index].prompt_parameters.length; i++)
            {
                var element_parameter_container = document.createElement('div');
                var element_parameter_label_syntax = document.createElement('h3');
                var element_parameter_label_description = document.createElement('h3');
                var element_parameter_label_example = document.createElement('h3');
                var element_parameter_syntax = document.createElement('p');
                var element_parameter_description = document.createElement('p');
                var element_parameter_example = document.createElement('code');
                element_parameter_label_syntax.innerHTML = "Parameter";
                element_parameter_label_description.innerHTML = "Description";
                element_parameter_label_example.innerHTML = "Example";
                element_parameter_syntax.innerHTML = data[index].prompt_parameters[i].parameter;
                element_parameter_description.innerHTML = data[index].prompt_parameters[i].parameter_description;
                element_parameter_example.innerHTML = "C:>" + data[index].prompt_parameters[i].parameter_example;
                element_parameter_container.className = "tag-parameter-info";
                element_parameter_example.className = 'terminal';
                element_parameter_container.appendChild(element_parameter_label_syntax);
                element_parameter_container.appendChild(element_parameter_syntax);
                element_parameter_container.appendChild(element_parameter_label_description);
                element_parameter_container.appendChild(element_parameter_description);
                element_parameter_container.appendChild(element_parameter_label_example);
                element_parameter_container.appendChild(element_parameter_example);
                element_container_tag_parameters.appendChild(element_parameter_container);
            }
        } catch {}

        // ###################################################################################################
        // Append Children
        element_prompt_body.appendChild(element_prompt_info_label_syntax);
        element_prompt_body.appendChild(element_prompt_info_syntax);

        element_prompt_body.appendChild(element_prompt_info_label_description);
        element_prompt_body.appendChild(element_prompt_info_description);

        element_prompt_body.appendChild(element_prompt_info_label_example);
        element_prompt_body.appendChild(element_prompt_info_example);

        element_container_tags.appendChild(element_container_tag_flags);
        element_container_tags.appendChild(element_container_tag_parameters);

        element_container_prompt.appendChild(element_prompt_header);
        element_container_prompt.appendChild(element_prompt_body);
        element_container_prompt.appendChild(element_container_tags);

        // Append section to page document
        document.getElementById('prompts').appendChild(element_container_prompt);
    }
}
    
// #####################################################################################################
// Main Function

recvData = {};

function main(){
    const URL = 'https://leandrorico.com/data';
    const req = new XMLHttpRequest();

    // Send API request
    req.responseType = 'json';
    req.open('GET', URL, true);

    // Load Data and store
    req.onload = function(){
        if(req.readyState == 4 && req.status == 200){
            recvData = req.response;
            elements_create_promptsScrollbar(recvData);
            elements_create_prompts(recvData.windows);
        }
    };
    // Send API request
    req.send();
}

main();