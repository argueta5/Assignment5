// Therapist class representing a therapist with name and type
class Therapist {
    constructor(name, type) {
        this.name = name; // therapist's name
        this.type = type; // type of therapy they practice
    }

    // Method to describe the therapist
    describe() {
        return `${this.name} practices ${this.type}.`;
    }
}

// Client class representing a client with name and therapists they are associated with
class Client {
    constructor(name) {
        this.name = name; // client's name
        this.therapists = []; // array to hold therapists associated with the client
    }

    // Method to add a therapist to the client
    addTherapist(therapist) {
        if (therapist instanceof Therapist) {
            this.therapists.push(therapist); // add therapist to the therapists array
        } else {
            throw new Error('You can only add an instance of Therapist. Argument is not a therapist.');
        }
    }

    // Method to describe the client
    describe() {
        return `${this.name} has ${this.therapists.length} therapists.`;
    }
}

// Menu class for managing clients and therapists
class Menu {
    constructor() {
        this.clients = []; // array to hold all clients
        this.selectedClient = null; // currently selected client
    }

    // Method to start the menu and handle user interactions
    start() {
        let selection = this.showMainMenuOptions(); // show main menu options and get user selection
        while (selection !== '0') { // loop until user selects '0' (exit)
            switch (selection) {
                case '1':
                    this.createClient(); // create a new client
                    break;
                case '2':
                    this.viewClient(); // view details of a client
                    break;
                case '3':
                    this.deleteClient(); // delete a client
                    break;
                case '4':
                    this.displayClients(); // display all clients
                    break;
                default:
                    selection = '0'; // exit the loop if selection is invalid
                    break;
            }
            selection = this.showMainMenuOptions(); // show main menu options again
        }

        alert('Goodbye!'); // notify user that program is ending
    }

    // Method to show main menu options and get user input
    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create new client 
            2) View client
            3) Delete client
            4) Display all clients
        `);
    }

    // Method to show client-specific menu options and get user input
    showClientMenuOptions(clientInfo) {
        return prompt(`
            0) back
            1) create therapist
            2) delete therapist
            
            ${clientInfo}
        `);
    }

    // Method to display all clients with their indices
    displayClients() {
        let clientString = '';
        for (let i = 0; i < this.clients.length; i++) {
            clientString += `${i}) ${this.clients[i].name}\n`; // display client's index and name
        }
        alert(clientString); // show the list of clients to the user
    }

    // Method to create a new client and add it to the clients array
    createClient() {
        let name = prompt('Enter name for new client'); // prompt user for client's name
        this.clients.push(new Client(name)); // create a new client and add it to the clients array
    }

    // Method to view details of a selected client
    viewClient() {
        let index = prompt('Enter the index of the client you wish to view:'); // prompt user for client's index
        index = parseInt(index); // convert user input to integer
        if (index >= 0 && index < this.clients.length) { // check if index is valid
            this.selectedClient = this.clients[index]; // set selectedClient to the client at the specified index
            let description = `Client Name: ${this.selectedClient.name}\n`; // client's name

            for (let i = 0; i < this.selectedClient.therapists.length; i++) {
                description += `${i}) ${this.selectedClient.therapists[i].name} - ${this.selectedClient.therapists[i].type}\n`; // therapist details
            }

            let selection = this.showClientMenuOptions(description); // show client-specific menu options
            switch (selection) {
                case '1':
                    this.createTherapist(); // create a new therapist for the selected client
                    break;
                case '2':
                    this.deleteTherapist(); // delete a therapist from the selected client
                    break;
            }
        }
    }

    // Method to delete a client from the clients array
    deletedClient() {
        let index = prompt('Enter the index of the client you wish to delete:'); // prompt user for client's index
        index = parseInt(index); // convert user input to integer
        if (index >= 0 && index < this.clients.length) { // check if index is valid
            this.clients.splice(index, 1); // remove the client at the specified index from the clients array
        }
    }

    // Method to create a new therapist for the selected client
    createTherapist() {
        let name = prompt('Enter name for new therapist:'); // prompt user for therapist's name
        let type = prompt('Enter therapy type for new therapist:'); // prompt user for therapist's type
        this.selectedClient.addTherapist(new Therapist(name, type)); // create a new therapist and add it to the selected client
    }

    // Method to delete a therapist from the selected client
    deleteTherapist() {
        let index = prompt('Enter the index of the therapist you wish to delete:'); // prompt user for therapist's index
        index = parseInt(index); // convert user input to integer
        if (index >= 0 && index < this.selectedClient.therapists.length) { // check if index is valid
            if (confirm(`Are you sure you want to delete ${this.selectedClient.therapists[index].name}?`)) { // confirmation dialog
                this.selectedClient.therapists.splice(index, 1); // remove the therapist at the specified index from the therapists array
            }
        }
    }
}

let menu = new Menu(); // create a new instance of Menu
menu.start(); // start the menu