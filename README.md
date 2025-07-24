 Changa DAO

A full-stack, modern Decentralized Autonomous Organization (DAO) platform built with React (frontend) and Dfinity/ICP Motoko canisters (backend).

 Project Overview

Changa DAO is a complete solution for creating and managing a DAO. It features a user-friendly web interface and a secure, decentralized backend running on the Internet Computer (ICP). The platform enables members to propose, vote, manage profiles, and interact with the DAO treasury—all in a seamless, blockchain-powered environment.

 Features

- Dashboard: Real-time DAO stats, treasury balance, and recent activity
- User Profiles: Manage member info and avatars
- Proposals & Voting: Create, review, and vote on DAO proposals
- Wallet Integration: Connect and view wallet details
- Decentralized Backend: Powered by Dfinity/ICP Motoko canisters for security and transparency
- Modular API Layer: Easily swap between mock APIs and real canister calls

 Tech Stack

- Frontend: React, Material UI, Vite, SCSS
- Backend: Dfinity Internet Computer (ICP), Motoko, Canisters
- API Layer: Modular, pluggable for easy backend integration

Getting Started

 Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [DFINITY SDK (dfx)](https://smartcontracts.org/docs/quickstart/quickstart-intro.html)
- (Optional) [Git](https://git-scm.com/)

 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Changa_DAO
```

 2. Install Frontend Dependencies

```bash
cd src/Changa_DAO_frontend
npm install
```

 3. Start the Backend (ICP Local Replica)

```bash
dfx start --background
dfx deploy
```

 4. Start the Frontend

```bash
npm start
```


 Customization

- Backend Integration:
  The frontend uses a modular API layer (`src/api/`). You can easily swap mock functions for real canister or REST API calls.
- Feature Expansion:
  Add or modify features by editing the corresponding page and API files.

Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

 License

This project is open-source and available under the [MIT License](LICENSE).

 Acknowledgements

- [DFINITY Foundation](https://dfinity.org/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

