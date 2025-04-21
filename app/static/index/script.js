//* Utils
const convertStorageUnit = (value, fromUnit, toUnit) => {
  //** Use Unit provided as a index to convert => value * (1024 * exponent of number of units up or down to be converted)) */
  const units = ["B", "KB", "MB", "GB", "TB"];
  const fromIndex = units.indexOf(fromUnit.toUpperCase());
  const toIndex = units.indexOf(toUnit.toUpperCase());

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error("Invalid storage units provided.");
  }

  return value * Math.pow(1024, fromIndex - toIndex);
};

//* Main
const form = document.querySelector("form");
const ramInput = document.querySelector("#ram");
const vcpuInput = document.querySelector("#vcpu");
/*
const osInput = document.querySelector("input[name='os']:checked");
* points to the radio selected at the time of script creation and remains unchanged afterward.
*/
const selectVM = document.querySelector("select[name='vm-select']");

const resultsContainer = document.querySelector("#results");
const cleanResultsContainer = () => { resultsContainer.innerHTML = ""; }
const renderVMDetails = (vm) => {
  resultsContainer.innerHTML = `      
    <p class="vm-name">${vm.meterName}
    ${vm.armSkuName == lowPriceVM ? ` (Recommended)` : ``}  
    </p>
    <div class="vm-details">
      <span>
        <p>vCPU:</p><p>${vm.numberOfCores}</p>
      </span>
      <span>
        <p>vCPU Architecture</p><p>${vm.CpuArchitectureType}</p>
      </span>
      <span>
        <p>RAM:</p>
        <p>${convertStorageUnit(vm.memoryInMB, "MB", "GB")} GB</p>
      </span>
      <span>
        <p>OS:</p><p>${vm.os}</p>
      </span>
      <span>
        <p>Disk Size:</p><p>${convertStorageUnit(vm.osDiskSizeInMB, "MB", "GB")} GB</p>
      </span>
        <span>
          <p>Encryption at Host:</p>
          ${vm.EncryptionAtHostSupported ? `
          <p style="color:greenyellow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </p>
          ` : `
          <p style="color:red">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
            // <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            // </svg>
          </p>
          `}
        </span>
      <span class="vm-price">
        <p>Price:</p><p>${vm.unitPricePerUnit} /h</p>
      </span>
    </div>
  `;
};

const matchVMs = []
let lowPriceVM = ""

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //* Get compatible VMs with inputs criteria
  const ramInMB = parseFloat(ramInput.value) * 1024;
  const vcpu = parseInt(vcpuInput.value);
  const os = document.querySelector("input[name='os']:checked")?.value;

  try {
    const response = await fetch(`/api/vms?ram=${ramInMB}&vcpu=${vcpu}&os=${os}`);
    const data = await response.json();

    cleanResultsContainer();
    if (data.length === 0) {
      resultsContainer.innerHTML = "<p>No VMs found matching your criteria.</p>";
      return;
    }

    //* Save response and populate the results container with the most economic VM
    matchVMs.push(...data);
    lowPriceVM = data[0].armSkuName;
    renderVMDetails(data[0]);

    //* Enable the select dropdown and populate with VMs options
    selectVM.disabled = false;
    selectVM.innerHTML = data.map((vm) => {
      return `
        <option value="${vm.armSkuName}">
          ${vm.meterName} - ${vm.numberOfCores} vCPUs - ${convertStorageUnit(vm.memoryInMB, "MB", "GB")} GB ${vm.armSkuName == lowPriceVM ? ` (Recommended)` : ``}
        </option>`;
    }).join("");


  } catch (error) {
    console.error("Error fetching VM data:", error);
    resultsContainer.innerHTML = "<p>Error fetching VM data. Try again Later</p>";
    return;
  }
});

selectVM.addEventListener("change", async (e) => {
  //* Get the selected VM from the dropdown and change the results container
  cleanResultsContainer();
  const selectedVMName = e.target.value;
  const selectedVM = matchVMs.find(vm => vm.armSkuName === selectedVMName);

  if (!selectedVM) {
    resultsContainer.innerHTML = "<p>Selected VM not found.</p>";
    return;
  }
  renderVMDetails(selectedVM);
})