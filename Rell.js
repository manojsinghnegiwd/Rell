import XmlReader from 'xml-reader'

let mainMountPoint = null
let registeredComponents = {}

const outPutHt2ml = node => {

    let element = null

    if ( node instanceof Array ) {
        return node.map(outPutHtml)
    }

    const mountPoint = node.parentToAppend || mainMountPoint

    if ( node.type == 'element' ) {

        if (node.name[0] == node.name[0].toUpperCase()) {

            const customElement = registeredComponents[node.name]

            stringToDOM(customElement.render(), renderNodes => {
                renderNodes.parentToAppend = mountPoint

                outPutHtml(renderNodes)
            })

        } else {

            element = document.createElement(node.name)

            mountPoint.append(element)

        }

    } 

    if ( node.type == 'text' ) {

        console.log(node.value)

        mountPoint.innerHTML = node.value

    } 

    if (node.children) {

        node.children.forEach(
            node => node.parentToAppend = element
        )

        return outPutHtml(node.children)
    }

}

const stringToDOM = (content, cb) => {
    const reader = XmlReader.create()

    reader.on('done', cb);

    reader.parse(
        content
    )
}

const render = (content, mountPoint) => {
    mainMountPoint = mountPoint
    stringToDOM(content, outPutHtml)
}

const Component = (componentClass) => {

    const component = new componentClass()

    registeredComponents[component.constructor.name] = component

}

export {
    render,
    Component
}