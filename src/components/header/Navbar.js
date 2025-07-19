import { client_data } from "../../config/config.js";

$( () => {
    $("#root-navbar").html(`
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                ${(client_data.img) ? `<img src="${client_data.img}" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">` : ``}
                ${client_data.name}
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">${client_data.title_navbar}</a>
                    </li>                    
                </ul>
            </div>
        </div>
    `);
})