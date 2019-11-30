import {config} from "./config";
import {getUrl} from "./functions/get-url";
import {BoundsValidator} from "./bounds-validator";
import {IMetadata} from "./metadata.interface";
import {collapseIcon} from "./icons/collapse";
import {expandIcon} from "./icons/expand";
import {editIcon} from "./icons/edit";
import {toolbarIcon} from "./icons/toolbar";
import {libraryIcon} from "./icons/library";
import IPluginConfig = SDK.IPluginConfig;
import IContextMenuItem = SDK.IContextMenuItem;
import IWidget = SDK.IWidget;
import MiroEvent = SDK.Event;
import {getModel} from "./functions/get-model";
import {checkAuth} from "./functions/check-auth";

class Main {
    private get config(): IPluginConfig {
        return {
            extensionPoints: {
                toolbar: {
                    title: 'C4 model',
                    toolbarSvgIcon: toolbarIcon,
                    librarySvgIcon: libraryIcon,
                    onClick: () => checkAuth(() => this.openLibraryView())
                },
                getWidgetMenuItems: (widgets) => this.getWidgetMenuItems(widgets)
            }
        };
    }

    public init(): Promise<void> {
        return new Promise((resolve) => {
            miro.onReady(() => miro.initialize(this.config).then(() => resolve()));
        });
    }

    public addListeners() {
        miro.addListener('WIDGETS_CREATED', (event) => this.onWidgetsCreated(event));
        miro.addListener('WIDGETS_TRANSFORMATION_UPDATED', (event) => {
            this.onWidgetsTransformationUpdated(event)
        });
    }

    private openLibraryView(): Promise<any> {
        return miro.board.ui.openLibrary(getUrl('library.html'), {title: 'C4 model'});
    }

    private openEditView(id: string, isDiagram: boolean): Promise<any> {
        const size = {
            width: 400,
            height: isDiagram ? 400 : 600
        };

        return miro.board.ui.openModal(getUrl('edit.html?id=' + id), size);
    }

    private jump(id: string): Promise<void> {
        return miro.board.viewport.zoomToObject(id);
    }

    private getWidgetMenuItems(widgets: IWidget[]): Promise<IContextMenuItem[]> {
        const isMultipleSelection: boolean = widgets.length > 1;

        if (isMultipleSelection) {
            return Promise.resolve([]);
        }

        const widget = widgets[0];
        const meta: IMetadata = widget.metadata[config.appId];
        const isC4Widget: boolean = !!meta;

        if (!isC4Widget) {
            return Promise.resolve([]);
        }

        const isDiagram = meta.type.indexOf('-diagram') !== -1;

        const menuItems = [
            {
                tooltip: 'edit C4 structure',
                svgIcon: editIcon,
                onClick: () => checkAuth(() => this.openEditView(widget.id, isDiagram))
            }
        ];

        let checkLink: Promise<void>;
        if (meta.link) {
            checkLink = getModel(meta.link).then((linkModel) => {
                if (!linkModel) {
                    return;
                }

                const tooltip ='jump to ' + linkModel.defaultText;

                menuItems.push({
                    tooltip,
                    svgIcon: isDiagram ? collapseIcon : expandIcon,
                    onClick: () => this.jump(meta.link)
                });
            });
        } else {
            checkLink = Promise.resolve();
        }

        return checkLink.then(() => menuItems);
    }

    private onWidgetsCreated(event: MiroEvent) {
        event.data.forEach((widgetInfo) => {
            if (widgetInfo.type === 'SHAPE') {
                getModel(widgetInfo.id).then((model) => BoundsValidator.validate(model));
            }
        });
    }

    private onWidgetsTransformationUpdated(event: MiroEvent) {
        event.data.forEach((widgetInfo) => {
            if (widgetInfo.type === 'SHAPE') {
                getModel(widgetInfo.id).then((model) => BoundsValidator.validate(model));
            }
        });
    }
}

const main = new Main();
main.init().then(() => main.addListeners());