export class Field {
    public input: HTMLInputElement | HTMLTextAreaElement;
    public label: HTMLLabelElement = null;

    public readonly baseInputClass = 'miro-input';
    public readonly primaryModifier = '--primary';

    constructor(name: string, title: string = null, type: string = 'text') {
        this.createInput(name, type);

        if (title) {
            this.createLabel(name, title);
        }
    }

    private createInput(name: string, type: string) {
        const tagName = type === 'textarea' ? 'textarea' : 'input';
        const input = document.createElement(tagName);

        if (input instanceof HTMLInputElement) {
            input.type = type;
        }

        input.name = name;
        input.id = name;

        if (type !== 'hidden') {
            input.classList.add(this.baseInputClass, this.baseInputClass + this.primaryModifier);
        }

        this.input = input;
    }

    private createLabel(name: string, title: string) {
        const label: HTMLLabelElement = document.createElement('label');

        label.htmlFor = name;
        label.innerText = title;

        this.label = label;
    }
}