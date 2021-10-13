// Main Game Module

function main() {
    // Initialize the game
    initialize();

    // Loop through the steps of the game
    while(true) {
        // Read the state of the table
        call_states();

        // Get next command from user
        command = get_command();

        // Call the next command
        call_command(command);
    }
}