import IShapeWidget = SDK.IShapeWidget;
import {IMetadata} from "../metadata.interface";
import {config} from "../config";
import {toLowerCamelCase} from "../functions/to-lower-camel-case";
import {widgetOptions} from "../widget-options";
import {typeLevel} from "../type-level";
import {ILink} from "../link.interface";
import {DiagramModel} from "./diagram";

export abstract class Model {
    public widget: IShapeWidget;

    abstract get name(): string;

    abstract get linkType(): string;

    public get meta(): IMetadata {
        return this.widget.metadata[config.appId];
    }

    public get type(): string {
        return this.meta.type;
    }

    public get options(): any {
        return widgetOptions[toLowerCamelCase(this.type)];
    }

    public get defaultText(): string {
        return this.options.text;
    }

    public get parentType(): string {
        const type = this.type.replace('-diagram', '');
        const index = typeLevel.indexOf(type) - 1;

        if (index < 0) {
            return null;
        }

        return typeLevel[index];
    }

    protected constructor(widget: IShapeWidget) {
        this.widget = widget;
    }

    protected abstract createLinkModel(widget: IShapeWidget): any;

    public save(): Promise<any> {
        return miro.board.widgets.update(this.widget);
    }

    public getPossibleLinks(): Promise<ILink[]> {
        return miro.board.widgets.get(['type', 'SHAPE']).then((widgets) => {
            return widgets
                .filter((widget) => {
                    const meta: IMetadata = widget.metadata[config.appId];
                    const isC4Widget: boolean = !!meta;

                    if (!isC4Widget) {
                        return false;
                    }

                    return meta.type === this.linkType;
                })
                .map((widget) => this.createLinkModel(widget as IShapeWidget))
                .map((model) => {
                    model = model as Model;
                    return {id: model.widget.id, name: model.name};
                })
                .filter((possibleLink) => !!possibleLink.name);
        });
    }
}