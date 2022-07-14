export default (context: any) => {
    const { route, redirect } = context;
    // 找不到时，则返回首页
    if (!route.matched.length || route.name === 'index') {
        redirect('/home');
        // redirect('/');
    }
}
