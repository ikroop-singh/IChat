import { BiLogOut } from "react-icons/bi";
import useLogout from "../../utils/useLogout";

const LogoutButton = () => {
	const[loading,logout]=useLogout();
	return (	
		<div className='mt-auto'>
			
				<BiLogOut onClick={logout} className='w-6 h-6 text-black cursor-pointer'  />
		</div>
	);
};
export default LogoutButton;