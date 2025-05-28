

export default {
    routes: [
        {
            method: 'GET',
            path: '/snippets/find-by-slug/:slug',
            handler: 'api::snippet.snippet.findBySlug', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
        },
        {
            method: 'GET',
            path: '/snippets/find-by-document-id/:documentId',
            handler: 'api::snippet.snippet.findByDocumentId', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
        },
        {
            method: 'PUT',
            path: '/snippets/update-views/:documentId',
            handler: 'api::snippet.snippet.updateViews', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
        },

    ],
}