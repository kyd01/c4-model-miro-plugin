import {Model} from "./model";
import IShapeWidget = SDK.IShapeWidget;
import {DiagramModel} from "./diagram";

export class EntityModel extends Model {
    public get name(): string {
        return this.parseInnerText()[0];
    }

    public get linkType(): string {
        return this.type + '-diagram';
    }

    public get description(): string {
        return this.parseInnerText()[1];
    }

    public constructor(widget: IShapeWidget) {
        super(widget);
    }

    public parseInnerText(): string[] {
        return this.widget.plainText.split(this.defaultText).map((part) => part.trim());
    }

    public setInnerText(name: string, description: string) {
        let text = '';

        if (name) {
            text += '<p>' + name + '</p>';
        }

        text += '<p>' + this.defaultText + '</p>';

        if (description) {
            text += '<p><br></p><p>' + description + '</p>';
        }

        this.widget.text = text;
    }

    protected createLinkModel(widget: IShapeWidget): any {
        return new DiagramModel(widget);
    }
}