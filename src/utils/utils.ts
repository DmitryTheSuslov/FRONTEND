export const isHomePage = (path:string) => {
	return path == "/"
}

export const isAddressPage = (path:string) => {
    return path.match(/^\/addresses\/(\d+)/)
}