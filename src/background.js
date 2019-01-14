import DPT from 'webext-domain-permission-toggle';
import DCS from 'webext-dynamic-content-scripts';

// For custom domain permissions
DPT.addContextMenu();
DCS.addToFutureTabs();
