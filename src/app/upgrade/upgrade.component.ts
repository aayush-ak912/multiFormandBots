import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  HostListener,
  OnInit
} from '@angular/core';
import { BotRow, Flow, CustomForm, Skin, Message } from '../Interface/interface';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit, AfterViewChecked {
  @Input() botConfig!: BotRow;
  @Input() SelectedFlow!: Flow;
  @Input() botList: BotRow[] = [];
  @Input() formList: CustomForm[] = [];

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  startChat = false;
  showOptions = false;
  Messages: Message[] = [];
  inputMessage = '';
  isWithAgent = false;
  collectingForm = false;
  formData: { [key: string]: string } = {};

  // Flow processing state
  currentStepIndex = 0;
  currentInputIndex = 0;
  activeForm!: CustomForm;

  botAlertSound = new Audio('assets/sounds/incoming.mp3');

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  toggleChat() {
    this.startChat = !this.startChat;
    this.showOptions = false;

    if (this.startChat) {
      this.Messages = [];
      this.currentStepIndex = 0;
      this.processNextStep();
    }
  }

  toggleOptions(event: MouseEvent) {
    event.stopPropagation();
    this.showOptions = !this.showOptions;
  }

  @HostListener('document:click')
  closeOptions() {
    this.showOptions = false;
  }

  sendUserMessage() {
    const trimmedMsg = this.inputMessage.trim();
    if (!trimmedMsg) return;

    this.Messages.push({ sender: 'user', message: trimmedMsg });
    this.inputMessage = '';

    // If collecting form input
    if (this.collectingForm && this.activeForm?.inputs) {
      const currentInput = this.activeForm.inputs[this.currentInputIndex];
      this.formData[currentInput.label] = trimmedMsg;
      this.currentInputIndex++;

      if (this.currentInputIndex < this.activeForm.inputs.length) {
        this.askNextFormInput();
      } else {
        // Form completed
        this.collectingForm = false;
        localStorage.setItem(
          'collectedFormData',
          JSON.stringify(this.formData)
        );
        this.Messages.push({
          sender: 'bot',
          message: `Thanks for the info!`
        });
        this.playBotSound();
        this.currentStepIndex++;
        this.processNextStep();
      }

      return;
    }

    // If not collecting form input
    setTimeout(() => {
      const reply = this.isWithAgent
        ? { sender: 'agent', message: 'Agent: I’m here to help!' }
        : { sender: 'bot', message: 'Bot: Thanks for your message!' };
      this.Messages.push(reply);
      this.playBotSound();
    }, 600);
  }

  processNextStep() {
    if (
      !this.SelectedFlow ||
      !this.SelectedFlow.steps ||
      this.currentStepIndex >= this.SelectedFlow.steps.length
    ) {
      return;
    }

    const step = this.SelectedFlow.steps[this.currentStepIndex];

    if (step.type === 'bot') {
      this.Messages.push({ sender: 'bot', message: step.name });
      this.playBotSound();
      this.currentStepIndex++;
      this.processNextStep(); // Optional: auto-continue
    } else if (step.type === 'form') {
      const form = this.formList.find(f => f.formName === step.name);
      if (form) {
        this.collectingForm = true;
        this.activeForm = form;
        this.formData = {};
        this.currentInputIndex = 0;
        this.askNextFormInput();
      } else {
        this.Messages.push({
          sender: 'bot',
          message: `⚠️ Form "${step.name}" not found.`
        });
        this.currentStepIndex++;
        this.processNextStep();
      }
    } else if (step.type === 'agent') {
      this.isWithAgent = true;
      this.Messages.push({
        sender: 'agent',
        message: 'Agent has joined the chat. How can I assist you?'
      });
      this.playBotSound();
      this.currentStepIndex++;
    }
  }

  askNextFormInput() {
    const nextInput = this.activeForm.inputs[this.currentInputIndex];
    this.Messages.push({
      sender: 'bot',
      message: `Please enter your ${nextInput.label}:`
    });
    this.playBotSound();
  }

  playBotSound() {
    this.botAlertSound.currentTime = 0;
    this.botAlertSound.play().catch(err => {
      console.warn('Audio failed:', err);
    });
  }

  openPopup() {
    console.log('Open in Popup clicked');
  }

  sendFeedback() {
    console.log('Feedback clicked');
  }

  endChat() {
    this.Messages = [];
    this.startChat = false;
    this.isWithAgent = false;
    this.collectingForm = false;
    this.formData = {};
    this.currentStepIndex = 0;
    this.currentInputIndex = 0;
  }
}
