# Quellen

eSpeak NG 1.50

## never.flac

Klavier: Auszug aus der MuseScore-Partitur unter https://musescore.com/user/28857438/scores/5112198

Gesang: eSpeak NG :-)

```
espeak-ng -s 130 "`<./message.txt`"
```

message.txt

```
Never gonna give you up

Never gonna let you down

Never gonna run around
and desert you

Never gonna make you cry

Never gonna say goodbye

Never gonna tell a lie
and hurt you
```

Kombiniert und arrangiert mit Audacity.

## cashewkerne.jpg

https://pixabay.com/photos/nuts-food-cashew-nuts-3841542/

Mit Exiftool Metadaten entfernt.

## cashewkern_intro.wav

```
espeak-ng -v German 'Sind Sie ein Cashewkern?'
```

Mit Audacity: "Cashew" durch "Cashew" aus

```
espeak-ng 'Cashew'
```

und "kern" durch "Kern" aus

```
espeak-ng -v German 'Sind Sie ein Kern?'
```

ersetzt.

## cashewkern_yes.wav

Ursprünglich:

```
espeak-ng -v German 'Danke für Ihre Ehrlichkeit.'
```

Gegenwärtig:

```
espeak-ng -v German -s 150 'Danke für Ihre Err lich keit.'
```

## cashewkern_no.wav

```
espeak-ng -v German 'Es tut mir leid, aber das glaube ich Ihnen nicht.'
```
