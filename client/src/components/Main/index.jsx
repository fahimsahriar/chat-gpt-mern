import styles from "./styles.module.css";
import ChatPage from "../Chat/ChatPage";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
    	<nav className={styles.navbar}>
    		<h1>MyGPT</h1>
    		<button className={styles.white_btn} onClick={handleLogout}>
    			Logout
    		</button>
    	</nav>
      <ChatPage />
    </div>
  );
};

export default Main;
