import { clearHTML } from "../../../utils/utils.js";
export const getGroups = ( groups ) => {
    const _groups = {};
    groups.forEach( group  => {
        const name = group.getName();
        
        const objt = {
            name: name,
            icon: group.getIconUrl(32),
            units: group.getUnits(),
            // length: Object.keys(groups[0]).length,
        }

        _groups[name] = objt;

        htmlCreateGroups(objt)
    });

    return _groups;
}

const htmlCreateGroups = (data) => {
    if ($('body #root_card_all_units').length == 0) {
        $("#root-card-groups").append(`
            <div class="card mb-3 col-2 shadow-lg border-0 btn-groups"  onClick="getInfocard('${data.name}', '', ${data.units.length}, 'all_units' )">
                <div class="card-body row " >
                    <div class="row g-0 align-items-center hover-animate rounded-4 shadow-lg" id="root_card_all_units">
                        <div class="col-auto p-3">
                            <div class="bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center " style="width: 50px; height: 50px;">
                                <img src="./src/assets/img/logojd.png" class="img-fluid" alt="32">
                            </div>
                        </div>
                        <div class="col ps-0">
                            <div class="card-body py-3">
                                <h6 class="card-title mb-1 text-muted text-center">Todas las unidades</h6>
                                <h4 class="mb-0 fw-bold text-center">50+</h4>
                            </div>
                        <div/>
                    </div>
                </div>
            </div>`
        );
    }
    
    $("#root-card-groups").append(`
        <div class="card mb-3 col-2 shadow-sm border-0 btn-groups"  onClick="getInfocard('${data.name}', '', ${data.units.length}, '${data.name}' )" >
            <div class="card-body row" id="">
                <div class="row g-0 align-items-center hover-animate rounded-4 shadow-lg" id="root_card_${data.name.replaceAll(' ', '_')}">
                    <div class="col-auto p-3">
                        <div class="bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center " style="width: 50px; height: 50px;">
                            <img src="${data.icon}" class="img-fluid" alt="32">
                        </div>
                    </div>
                    <div class="col ps-0">
                        <div class="card-body py-3">
                            <h6 class="card-title mb-1 text-muted text-center">${data.name}</h6>
                            <h4 class="mb-0 fw-bold text-center">${data.units.length}</h4>
                        </div>
                    <div/>
                </div>
            </div>
        </div>`
    );
}