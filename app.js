'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav?.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); menu.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  document.querySelectorAll('.product').forEach(item => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; if (!item.hidden) count++; });
  document.querySelector('#gallery-status').textContent = `Showing ${count} product${count === 1 ? '' : 's'}.`;
}));
const form = document.querySelector('#quote-form');
const status = document.querySelector('#contact-status');
const waButton = document.querySelector('#send-whatsapp');
const emailButton = document.querySelector('#send-email');
waButton.disabled = true; emailButton.disabled = true;
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const select = document.querySelector('#service');
  const value = link.dataset.service;
  if (![...select.options].some(o => o.value === value)) select.add(new Option(value, value));
  select.value = value;
}));
let contact = { email: '', whatsapp: '' };
function validEmail(value) { return typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value) && !/\.example$/i.test(value.split('@')[1]); }
function validPhone(value) { return typeof value === 'string' && /^[1-9]\d{7,14}$/.test(value); }
function renderContact(id, value, href) { const node = document.querySelector(id); const link = document.createElement('a'); link.textContent = value; link.href = href; node.replaceChildren(link); }
fetch('site-config.json').then(response => { if (!response.ok) throw new Error('Configuration unavailable'); return response.json(); }).then(config => {
  contact.email = validEmail(config.email) ? config.email : '';
  contact.whatsapp = validPhone(config.whatsapp) ? config.whatsapp : '';
  waButton.disabled = !contact.whatsapp; emailButton.disabled = !contact.email;
  if (contact.email) renderContact('#business-email', contact.email, `mailto:${contact.email}`);
  if (contact.whatsapp) renderContact('#business-whatsapp', `+${contact.whatsapp}`, `https://wa.me/${contact.whatsapp}`);
  if (contact.email || contact.whatsapp) status.textContent = 'Your message opens in your chosen app. Review it and press Send there. Files must be attached separately.';
}).catch(() => { status.textContent = 'Contact configuration could not load. Enquiry sending is unavailable. Please try again later.'; });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const channel = event.submitter?.dataset.channel;
  if ((channel === 'whatsapp' && !contact.whatsapp) || (channel === 'email' && !contact.email) || !channel) { status.textContent = 'Please select an available contact method. Contact details may still be awaiting confirmation.'; return; }
  const data = new FormData(form);
  const message = `Hello Creation Space! I'd like to enquire about a project.\n\nName: ${data.get('name')}\nEmail: ${data.get('email') || 'Not provided'}\nProject: ${data.get('service')}\nQuantity: ${data.get('quantity') || 'To discuss'}\nIdeal date: ${data.get('date') || 'Flexible / to discuss'}\n\nDetails:\n${data.get('details')}\n\nI will attach any reference images or 3D files separately.`;
  const url = channel === 'whatsapp' ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}` : `mailto:${contact.email}?subject=${encodeURIComponent('3D printing project enquiry — ' + data.get('name'))}&body=${encodeURIComponent(message)}`;
  if (channel === 'whatsapp') { window.open(url, '_blank', 'noopener,noreferrer'); } else window.location.href = url;
  status.replaceChildren(document.createTextNode('Message prepared. Review and send it in your app. If it did not open, '));
  const fallback = document.createElement('a'); fallback.href = url; fallback.textContent = 'open your draft here'; if (channel === 'whatsapp') { fallback.target = '_blank'; fallback.rel = 'noopener noreferrer'; } status.append(fallback, document.createTextNode('. Nothing has been submitted by this website.'));
});
