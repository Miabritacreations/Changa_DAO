# Changa DAO

A full-stack, modern Decentralized Autonomous Organization (DAO) platform built with React (frontend) and Dfinity/ICP Motoko canisters (backend).

## 🚀 Live Demo

**[View Live Project](https://github.com/Miabritacreations/Changa_DAO)**

> **Note:** This is currently a development version. For a live demo, you'll need to run it locally following the setup instructions below.

## ✨ Features

- **Dashboard:** Real-time DAO stats, treasury balance, and recent activity
- **User Profiles:** Manage member info and avatars with Internet Identity authentication
- **Proposals & Voting:** Create, review, and vote on DAO proposals
- **Wallet Integration:** Connect and view wallet details
- **Decentralized Backend:** Powered by Dfinity/ICP Motoko canisters for security and transparency
- **Modular API Layer:** Easily swap between mock APIs and real canister calls

## 🛠️ Tech Stack

- **Frontend:** React, Material UI, Vite, SCSS
- **Backend:** Dfinity Internet Computer (ICP), Motoko, Canisters
- **Authentication:** Internet Identity (II)
- **API Layer:** Modular, pluggable for easy backend integration

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [DFINITY SDK (dfx)](https://smartcontracts.org/docs/quickstart/quickstart-intro.html)
- (Optional) [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Miabritacreations/Changa_DAO.git
cd Changa_DAO
```

### 2. Install Frontend Dependencies

```bash
cd src/Changa_DAO_frontend
npm install
```

### 3. Start the Backend (ICP Local Replica)

```bash
cd ~/Changa_DAO
dfx start --background
dfx deploy
```

### 4. Start the Frontend

```bash
cd ~/Changa_DAO/src/Changa_DAO_frontend
npm start
```

### 5. Open the App

Visit [http://localhost:3000]((http://localhost:5173/Changa_DAO/)) in your browser.

## 🧩 Customization

- **Backend Integration:**  
  The frontend uses a modular API layer (`src/api/`). You can easily swap mock functions for real canister or REST API calls.
- **Feature Expansion:**  
  Add or modify features by editing the corresponding page and API files.

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [DFINITY Foundation](https://dfinity.org/)
- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

---

**Customizable, open-source, and ready for any DAO community!**
