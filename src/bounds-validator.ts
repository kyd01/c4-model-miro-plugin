import {config} from "./config";
import IShapeWidget = SDK.IShapeWidget;
import IRect = SDK.IRect;
import {DiagramModel} from "./models/diagram";
import {EntityModel} from "./models/entity";

export class BoundsValidator {
    private static readonly errorBorderColor: string = '#ff0000';

    public static validate(model: DiagramModel|EntityModel) {
        if (!miro.board.widgets.__getIntersectedObjects) {
            return;
        }

        const hasDiagram: boolean = !!model.meta && (model instanceof EntityModel) && !!model.parentType;

        if(!hasDiagram) {
            return;
        }

        const hasStyle: boolean = model.options.style && model.options.style.borderColor;

        if (!hasStyle) {
            return;
        }

        miro.board.widgets.__getIntersectedObjects(this.getRectFromObject(model.widget)).then((widgets) => {
            const diagramType = model.parentType+ '-diagram';

            const diagram = widgets.find((widget) => {
                const metadata = widget.metadata[config.appId];
                return metadata.type === diagramType;
            });

            const baseBorderColor = model.options.style.borderColor;

            model.widget.style.borderColor = diagram ? baseBorderColor : this.errorBorderColor;
            return model.save();
        });
    }

    private static getRectFromObject(widget: IShapeWidget): IRect {
        return {
            x: widget.x,
            y: widget.y,
            width: widget.width,
            height: widget.height,
        };
    }
}