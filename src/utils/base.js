const base = (app) => {
    const requireComponent = require.context(
        '../components/globals',
        false,
        /_base-[\w-]+\.vue$/,
    );
        
    requireComponent.keys().forEach((fileName) => {
    
        const componentConfig = requireComponent(fileName);
      
        const componentName = fileName
        .replace(/^\.\/_/, '')
        .replace(/\.\w+$/, '')
        .split('-')
        .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
        .join('');
      
        app.component(componentName, componentConfig.default || componentConfig);
    });
}

export default base;