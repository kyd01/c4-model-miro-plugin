import {config} from "../config";
import {widgetOptions} from "../widget-options";
import {getUrl} from "../functions/get-url";
import {toLowerCamelCase} from "../functions/to-lower-camel-case";

require('./library.view.sass');

const hotspots = {
    code: require('./hotspots/code.svg'),
    component: require('./hotspots/component.svg'),
    'component-diagram': require('./hotspots/component-diagram.svg'),
    container: require('./hotspots/container.svg'),
    'container-diagram': require('./hotspots/container-diagram.svg'),
    context: require('./hotspots/context.svg'),
    'context-diagram': require('./hotspots/context-diagram.svg'),
    'external-context': require('./hotspots/external-context.svg'),
    person: require('./hotspots/person.svg')
};

class LibraryView {
    private currentTarget: HTMLElement;
    private readonly draggableItemSelector: string = '.c4-object';

    public init() {
        const options = {
            draggableItemSelector: this.draggableItemSelector,
            onClick: (targetElement) => this.onClick(targetElement),
            getDraggableItemPreview: (targetElement) => this.getDraggableItemPreview(targetElement),
            onDrop: (canvasX, canvasY) => this.onDrop(canvasX, canvasY)
        };

        miro.onReady(() => miro.board.ui.initDraggableItemsContainer(document.body, options));
    }

    private createWidget(type, canvasX = null, canvasY = null) {
        const defaultOptions = {
            type: 'shape',
            x: canvasX || 0,
            y: canvasY || 0,
            metadata: {
                [config.appId]: {
                    type: type
                }
            }
        };

        return miro.board.widgets.create(Object.assign(defaultOptions, widgetOptions[toLowerCamelCase(type)]));
    }

    private onClick(targetElement: HTMLElement) {
        const type = targetElement.dataset.type;
        this.createWidget(type);
    }

    private getDraggableItemPreview(targetElement: HTMLElement) {
        this.currentTarget = targetElement;
        const type = targetElement.dataset.type;
        const hotspot = hotspots[type];
        return {url: getUrl(hotspot)};
    }

    private onDrop(canvasX: number, canvasY: number) {
        const type = this.currentTarget.dataset.type;
        this.createWidget(type, canvasX, canvasY);
    }
}

const view = new LibraryView();
view.init();