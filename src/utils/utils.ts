export const isHomePage = (path:string) => {
	return path == "/"
}

export const isAddressPage = (path:string) => {
    return path.match(/^\/addresses\/(\d+)/)
}

export const isEditPage = (path: string) => {
    return path.match(/^\/users\/\d+\/edit$/);
  };  
export const isMyFixationsPage = (path: string) => {
    return path === "/my_fixations";
  };
export const isProfilePage = (path: string) => {
    return path === "/profile";
  };